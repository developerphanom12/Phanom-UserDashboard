<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\TopbarLink;
use App\Models\ServiceSection;
use App\Models\ServiceItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TopbarApiController extends Controller
{
  // LINKS
  public function linksIndex() {
    return TopbarLink::orderBy('sort_order')->get();
  }
  public function linksStore(Request $r) {
    $data = $r->validate([
      'label'=>'required|string|max:100',
      'url'=>'required|string|max:255',
      'is_enabled'=>'boolean',
      'icon'=>'nullable|string|max:100',
      'is_external'=>'boolean',
      'target'=>'nullable|string|max:20',
    ]);
    $data['sort_order'] = TopbarLink::max('sort_order') + 1;
    return TopbarLink::create($data);
  }
  public function linksUpdate(Request $r, TopbarLink $link) {
    $data = $r->validate([
      'label'=>'required|string|max:100',
      'url'=>'required|string|max:255',
      'is_enabled'=>'boolean',
      'icon'=>'nullable|string|max:100',
      'is_external'=>'boolean',
      'target'=>'nullable|string|max:20',
    ]);
    $link->update($data);
    return $link->fresh();
  }
  public function linksToggle(TopbarLink $link) {
    $link->update(['is_enabled'=>!$link->is_enabled]);
    return $link->fresh();
  }
  public function linksReorder(Request $r) {
    $data = $r->validate(['order'=>'required|array','order.*'=>'integer']);
    DB::transaction(function() use ($data) {
      foreach ($data['order'] as $idx => $id) {
        TopbarLink::where('id',$id)->update(['sort_order'=>$idx]);
      }
    });
    return response()->json(['status'=>'ok']);
  }
  public function linksDestroy(TopbarLink $link) {
    $link->delete();
    return response()->json(['status'=>'deleted']);
  }

  // SECTIONS
  public function sectionsIndex() {
    return ServiceSection::with('items')->orderBy('sort_order')->get();
  }
  public function sectionsStore(Request $r) {
    $data = $r->validate(['title'=>'required|string|max:120','is_enabled'=>'boolean']);
    $data['sort_order'] = ServiceSection::max('sort_order') + 1;
    return ServiceSection::create($data);
  }
  public function sectionsUpdate(Request $r, ServiceSection $section) {
    $data = $r->validate(['title'=>'required|string|max:120','is_enabled'=>'boolean']);
    $section->update($data);
    return $section->fresh();
  }
  public function sectionsToggle(ServiceSection $section) {
    $section->update(['is_enabled'=>!$section->is_enabled]);
    return $section->fresh();
  }
  public function sectionsReorder(Request $r) {
    $data = $r->validate(['order'=>'required|array','order.*'=>'integer']);
    DB::transaction(function() use ($data) {
      foreach ($data['order'] as $idx => $id) {
        ServiceSection::where('id',$id)->update(['sort_order'=>$idx]);
      }
    });
    return response()->json(['status'=>'ok']);
  }
  public function sectionsDestroy(ServiceSection $section) {
    $section->delete();
    return response()->json(['status'=>'deleted']);
  }

  // ITEMS
  public function itemsIndex(ServiceSection $section) {
    return $section->items()->orderBy('sort_order')->get();
  }
  public function itemsStore(Request $r, ServiceSection $section) {
    $data = $r->validate(['label'=>'required|string|max:120','url'=>'required|string|max:255','is_enabled'=>'boolean']);
    $data['service_section_id'] = $section->id;
    $data['sort_order'] = ServiceItem::where('service_section_id',$section->id)->max('sort_order') + 1;
    return ServiceItem::create($data);
  }
  public function itemsUpdate(Request $r, ServiceItem $item) {
    $data = $r->validate(['label'=>'required|string|max:120','url'=>'required|string|max:255','is_enabled'=>'boolean']);
    $item->update($data);
    return $item->fresh();
  }
  public function itemsToggle(ServiceItem $item) {
    $item->update(['is_enabled'=>!$item->is_enabled]);
    return $item->fresh();
  }
  public function itemsReorder(Request $r, ServiceSection $section) {
    $data = $r->validate(['order'=>'required|array','order.*'=>'integer']);
    DB::transaction(function() use ($data,$section) {
      foreach ($data['order'] as $idx => $id) {
        ServiceItem::where('id',$id)->where('service_section_id',$section->id)->update(['sort_order'=>$idx]);
      }
    });
    return response()->json(['status'=>'ok']);
  }
  public function itemsDestroy(ServiceItem $item) {
    $item->delete();
    return response()->json(['status'=>'deleted']);
  }
}
