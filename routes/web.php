<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
    if(isset($_COOKIE['token']))
        return view('main');
    else 
        return view('welcome');
})->name('main');


Route::get('/signup', function () {
    return view('register');
})->name('register');

Route::get('/login', function () {
    return view('login');
})->name('login');