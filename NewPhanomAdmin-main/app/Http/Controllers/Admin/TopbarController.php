<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TopbarLink;
use App\Models\ServiceSection;
use App\Models\ServiceItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TopbarController extends Controller
{
  public function index()
  {
    $links = TopbarLink::orderBy('sort_order')->get();
    $sections = ServiceSection::with(['items'])->orderBy('sort_order')->get();
    return view('admin.topbar.index', compact('links','sections'));
  }

  // ---- Topbar Links CRUD ----
  public function storeLink(Request $r)
  {
    $data = $r->validate([
      'label'=>'required|string|max:100',
      'url'=>'required|string|max:255',
      'is_enabled'=>'sometimes|boolean',
      'icon'=>'nullable|string|max:100',
      'is_external'=>'sometimes|boolean',
      'target'=>'nullable|string|max:20',
    ]);
    $data['sort_order'] = TopbarLink::max('sort_order') + 1;
    TopbarLink::create($data);
    return back()->with('ok','Link created');
  }

  public function updateLink(Request $r, TopbarLink $link)
  {
    $data = $r->validate([
      'label'=>'required|string|max:100',
      'url'=>'required|string|max:255',
      'is_enabled'=>'sometimes|boolean',
      'icon'=>'nullable|string|max:100',
      'is_external'=>'sometimes|boolean',
      'target'=>'nullable|string|max:20',
    ]);
    $link->update($data);
    return back()->with('ok','Link updated');
  }

  public function toggleLink(TopbarLink $link)
  {
    $link->update(['is_enabled'=>!$link->is_enabled]);
    return back()->with('ok','Link toggled');
  }

  public function reorderLinks(Request $r)
  {
    $data = $r->validate(['order'=>'required|array','order.*'=>'integer']);
    DB::transaction(function() use ($data) {
      foreach ($data['order'] as $idx => $id) {
        TopbarLink::where('id',$id)->update(['sort_order'=>$idx]);
      }
    });
    return back()->with('ok','Links reordered');
  }

  public function destroyLink(TopbarLink $link)
  {
    $link->delete();
    return back()->with('ok','Link deleted');
  }

  // ---- Service Sections & Items ----
  public function storeSection(Request $r)
  {
    $data = $r->validate([
      'title'=>'required|string|max:120',
      'is_enabled'=>'sometimes|boolean'
    ]);
    $data['sort_order'] = ServiceSection::max('sort_order') + 1;
    ServiceSection::create($data);
    return back()->with('ok','Section created');
  }

  public function updateSection(Request $r, ServiceSection $section)
  {
    $data = $r->validate([
      'title'=>'required|string|max:120',
      'is_enabled'=>'sometimes|boolean'
    ]);
    $section->update($data);
    return back()->with('ok','Section updated');
  }

  public function toggleSection(ServiceSection $section)
  {
    $section->update(['is_enabled'=>!$section->is_enabled]);
    return back()->with('ok','Section toggled');
  }

  public function reorderSections(Request $r)
  {
    $data = $r->validate(['order'=>'required|array','order.*'=>'integer']);
    DB::transaction(function() use ($data) {
      foreach ($data['order'] as $idx => $id) {
        ServiceSection::where('id',$id)->update(['sort_order'=>$idx]);
      }
    });
    return back()->with('ok','Sections reordered');
  }

  public function destroySection(ServiceSection $section)
  {
    $section->delete();
    return back()->with('ok','Section deleted');
  }

  // Items
  public function storeItem(Request $r, ServiceSection $section)
  {
    $data = $r->validate([
      'label'=>'required|string|max:120',
      'url'=>'required|string|max:255',
      'is_enabled'=>'sometimes|boolean'
    ]);
    $data['service_section_id'] = $section->id;
    $data['sort_order'] = ServiceItem::where('service_section_id',$section->id)->max('sort_order') + 1;
    ServiceItem::create($data);
    return back()->with('ok','Item created');
  }

  public function updateItem(Request $r, ServiceItem $item)
  {
    $data = $r->validate([
      'label'=>'required|string|max:120',
      'url'=>'required|string|max:255',
      'is_enabled'=>'sometimes|boolean'
    ]);
    $item->update($data);
    return back()->with('ok','Item updated');
  }

  public function toggleItem(ServiceItem $item)
  {
    $item->update(['is_enabled'=>!$item->is_enabled]);
    return back()->with('ok','Item toggled');
  }

  public function reorderItems(Request $r, ServiceSection $section)
  {
    $data = $r->validate(['order'=>'required|array','order.*'=>'integer']);
    DB::transaction(function() use ($data, $section) {
      foreach ($data['order'] as $idx => $id) {
        ServiceItem::where('id',$id)->where('service_section_id',$section->id)->update(['sort_order'=>$idx]);
      }
    });
    return back()->with('ok','Items reordered');
  }

  public function destroyItem(ServiceItem $item)
  {
    $item->delete();
    return back()->with('ok','Item deleted');
  }
}
