<?php

use Illuminate\Support\Facades\Route;
use Msdev2\MediaPicker\Http\Controllers\MediaController;


Route::group([
    'prefix' => 'media-picker',
    'middleware' => ['web']
], function () {
    Route::get('/', [MediaController::class, 'index'])->name('media-picker.index');
    Route::get('/list/{folder?}', [MediaController::class, 'list'])->name('media-picker.list');
    Route::post('/upload', [MediaController::class, 'upload'])->name('media-picker.upload');
    Route::post('/folder', [MediaController::class, 'createFolder'])->name('media-picker.folder');
    Route::delete('/file', [MediaController::class, 'deleteFile'])->name('media-picker.delete');
});
