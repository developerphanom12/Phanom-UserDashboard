<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class ServiceItem extends Model
{
  protected $fillable = ['service_section_id','label','url','is_enabled','sort_order'];
  protected $casts = ['is_enabled'=>'boolean'];

  public function section() {
    return $this->belongsTo(ServiceSection::class,'service_section_id');
  }
}
