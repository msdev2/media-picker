<?php

use Illuminate\Support\Facades\Route;
use Msdev2\MediaPicker\Http\Controllers\MediaController;

Route::prefix('media-picker')->name('media-picker.')->group(function () {
    Route::get('/', [MediaController::class, 'index'])->name('index');
    Route::get('/get-contents', [MediaController::class, 'getContents'])->name('getContents');
    Route::post('/create-folder', [MediaController::class, 'createFolder'])->name('createFolder');
    Route::post('/upload', [MediaController::class, 'upload'])->name('upload');
    Route::post('/delete', [MediaController::class, 'delete'])->name('delete');
    Route::get('/render/{path}', [MediaController::class, 'renderFile'])->name('renderFile');
});
Route::get('uploads/{folder}/{width}/{height}/{name}', [MediaController::class, 'getImage'])
    ->where('name', '.*'); // Allow dots in filenames

Route::get('uploads/{folder}/{name}', [MediaController::class, 'getMainImage'])
    ->where('name', '.*'); // Allow dots in filenames