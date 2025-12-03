<?php

// database/seeders/TopbarSeeder.php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\TopbarLink;

class TopbarSeeder extends Seeder {
  public function run(): void {
    $data = [
      ['label'=>'Home','url'=>'/','sort_order'=>0],
      ['label'=>'My Services','url'=>'/services','sort_order'=>1],
      ['label'=>'Case Study','url'=>'/case-study','sort_order'=>2],
      ['label'=>'Our Portfolio','url'=>'/portfolio','sort_order'=>3],
      ['label'=>'Hosting','url'=>'/hosting','sort_order'=>4],
      ['label'=>'Blog','url'=>'/blogs','sort_order'=>5],
      ['label'=>'Login','url'=>'/login','sort_order'=>6],
      ['label'=>'Logout','url'=>'/logout','sort_order'=>7],
      ['label'=>'Hire Indian Talent','url'=>'/hire-talent','sort_order'=>8],
    ];
    foreach ($data as $i => $row) {
      TopbarLink::firstOrCreate(['label'=>$row['label']], $row + ['is_enabled'=>true]);
    }
  }
}
