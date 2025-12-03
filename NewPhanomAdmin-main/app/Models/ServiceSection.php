<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class ServiceSection extends Model
{
  protected $fillable = ['title','is_enabled','sort_order'];
  protected $casts = ['is_enabled'=>'boolean'];

  public function items() {
    return $this->hasMany(ServiceItem::class)->orderBy('sort_order');
  }
}
