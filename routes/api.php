<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::prefix('user')->group( function() {

    Route::post('/register', 'App\Http\Controllers\UserController@register');
    Route::post('/login', 'App\Http\Controllers\UserController@login'); 
});

Route::group(['middleware' => ['auth:sanctum'], 'prefix' => 'calendars'], function () {

    Route::get('/', 'App\Http\Controllers\EventController@index');
    Route::post('/', 'App\Http\Controllers\EventController@store'); 
    Route::get('/{id}', 'App\Http\Controllers\EventController@showByUserId');
    Route::patch('/{id}', 'App\Http\Controllers\EventController@update'); 
    Route::delete('/{id}', 'App\Http\Controllers\EventController@destroy'); 
});

Route::group(['middleware' => ['auth:sanctum'], 'prefix' => 'events'], function () {

    Route::get('/', 'App\Http\Controllers\EventController@index');
    Route::post('/', 'App\Http\Controllers\EventController@store'); 
    Route::get('/{id}', 'App\Http\Controllers\EventController@show');
    Route::patch('/{id}', 'App\Http\Controllers\EventController@update'); 
    Route::delete('/{id}', 'App\Http\Controllers\EventController@destroy'); 
});