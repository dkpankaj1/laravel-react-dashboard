<?php

use App\Http\Controllers\API\Auth\LoginController;
use App\Http\Controllers\API\Auth\PasswordResetController;
use App\Http\Controllers\API\Auth\PasswordUpdateController;
use App\Http\Controllers\API\Auth\ProfileController;
use App\Http\Controllers\API\V1\UserController;
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
Route::group(['prefix'=> 'v1'], function () {
    Route::post("/login",[LoginController::class,"login"]);
    Route::post("/forgot-password",[PasswordResetController::class,"sendPasswordResetOtpEmail"]);
    Route::put("/reset-password",[PasswordResetController::class,"resetPassword"]);
    
});


Route::group(['middleware' => 'auth:sanctum','prefix'=> 'v1'], function () {

    Route::apiResource('/user',UserController::class);
    
    Route::get('/profile',[ProfileController::class,'profile'])->name('profile.show');
    Route::put('/profile',[ProfileController::class,'update'])->name('profile.update');
    Route::put('/update-password',[PasswordUpdateController::class,'update'])->name('password.update');
    Route::post("/logout",[LoginController::class,"logout"]);
});