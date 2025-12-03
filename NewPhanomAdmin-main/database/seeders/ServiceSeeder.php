<?php

// database/seeders/ServiceSeeder.php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\ServiceSection;
use App\Models\ServiceItem;

class ServiceSeeder extends Seeder {
  public function run(): void {
    $sections = [
      'Digital Marketing' => ['SEO','Social Media','PPC','Youtube Marketing'],
      'Development' => ['Web Development','Shopify','Magento','WordPress'],
      'Graphics & Animation' => ['Branding','Packaging','Web Design','Animation','Rotoscoping'],
      'E-commerce' => ['E-Commerce Marketing','Amazon Marketing'],
    ];
    $order = 0;
    foreach ($sections as $title => $items) {
      $sec = ServiceSection::firstOrCreate(['title'=>$title], ['sort_order'=>$order++,'is_enabled'=>true]);
      $i=0;
      foreach ($items as $label) {
        ServiceItem::firstOrCreate(
          ['service_section_id'=>$sec->id,'label'=>$label],
          ['url'=>'/services','sort_order'=>$i++,'is_enabled'=>true]
        );
      }
    }
  }
}
