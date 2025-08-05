<?php

namespace Database\Seeders;

use App\Features\User\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'id'       => Str::uuid(), 
            'name'     => 'Admin Grosir',
            'email'    => 'admin@gmail.com',
            'password' => Hash::make('12345678'),
        ]);
    }
}
