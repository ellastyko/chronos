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


Route::prefix('users')->group( function() {

    Route::get('/', 'App\Http\Controllers\UserController@index'); 
    Route::post('/register', 'App\Http\Controllers\UserController@register');
    Route::post('/login', 'App\Http\Controllers\UserController@login'); 
});

Route::group(['middleware' => ['auth:sanctum'], 'prefix' => 'calendars'], function () {

    Route::get('/', 'App\Http\Controllers\CalendarController@UserCalendars');
    Route::post('/', 'App\Http\Controllers\CalendarController@store'); 
    Route::post('/invite', 'App\Http\Controllers\CalendarController@invite');
    Route::get('/{id}', 'App\Http\Controllers\CalendarController@show');
    Route::get('/{id}/events', 'App\Http\Controllers\CalendarController@showEvents');
});

Route::group(['middleware' => ['auth:sanctum'], 'prefix' => 'events'], function () {

    Route::get('/', 'App\Http\Controllers\EventController@index');
    Route::post('/', 'App\Http\Controllers\EventController@store'); 
    Route::get('/{id}', 'App\Http\Controllers\EventController@show');
    Route::patch('/{id}', 'App\Http\Controllers\EventController@update'); 
    Route::delete('/{id}', 'App\Http\Controllers\EventController@destroy'); 
});