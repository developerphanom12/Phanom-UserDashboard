<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class TopbarLink extends Model
{
  protected $fillable = ['label','url','is_enabled','sort_order','icon','is_external','target'];
  protected $casts = ['is_enabled'=>'boolean','is_external'=>'boolean'];
}
