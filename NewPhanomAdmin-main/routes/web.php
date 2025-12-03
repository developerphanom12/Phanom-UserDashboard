<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\Admin\TopbarController;
use App\Http\Controllers\Admin\ContactQueryController;
use App\Http\Controllers\Admin\QueryController;
use App\Http\Controllers\Admin\ContactInfoController;
use App\Http\Controllers\Admin\BlogCategoryController;
use App\Http\Controllers\Admin\BlogPostController;
use App\Http\Controllers\Admin\NewsletterController;
use App\Http\Controllers\Admin\UserDetailsController;
use App\Http\Controllers\Admin\QuizController;
use App\Http\Controllers\Admin\SignupConfigController;

/*
|--------------------------------------------------------------------------
| Admin Auth
|--------------------------------------------------------------------------
*/

// Login
Route::get('/', [AdminAuthController::class, 'showLogin'])->name('admin.login.show');
Route::post('/admin/login', [AdminAuthController::class, 'login'])->name('admin.login');

// Hidden Registration (only when no admin exists)
Route::get('/_admin/setup', [AdminAuthController::class, 'showRegister'])->name('admin.register.show');
Route::post('/_admin/setup', [AdminAuthController::class, 'register'])->name('admin.register');

// Logout
Route::post('/admin/logout', [AdminAuthController::class, 'logout'])->name('admin.logout');


/*
|--------------------------------------------------------------------------
| Protected Admin Area
|--------------------------------------------------------------------------
*/
Route::middleware('admin.auth')->group(function () {

    // ---- Dashboard ----
    Route::get('/dashboard', function () {
        return view('dashboard.dashboard');
    })->name('dashboard');

    Route::get('/website-landing', function () {
        return view('website.landing');
    })->name('website.landing');


    /*
    |--------------------------------------------------------------------------
    | Topbar Management
    |--------------------------------------------------------------------------
    */
    Route::prefix('admin/topbar')->name('topbar.')->group(function () {
        Route::get('/', [TopbarController::class, 'index'])->name('index');

        // Links
        Route::post('/links', [TopbarController::class, 'storeLink'])->name('links.store');
        Route::put('/links/{link}', [TopbarController::class, 'updateLink'])->name('links.update');
        Route::patch('/links/{link}/toggle', [TopbarController::class, 'toggleLink'])->name('links.toggle');
        Route::post('/links/reorder', [TopbarController::class, 'reorderLinks'])->name('links.reorder');
        Route::delete('/links/{link}', [TopbarController::class, 'destroyLink'])->name('links.destroy');

        // Sections
        Route::post('/sections', [TopbarController::class, 'storeSection'])->name('sections.store');
        Route::put('/sections/{section}', [TopbarController::class, 'updateSection'])->name('sections.update');
        Route::patch('/sections/{section}/toggle', [TopbarController::class, 'toggleSection'])->name('sections.toggle');
        Route::post('/sections/reorder', [TopbarController::class, 'reorderSections'])->name('sections.reorder');
        Route::delete('/sections/{section}', [TopbarController::class, 'destroySection'])->name('sections.destroy');

        // Items
        Route::post('/sections/{section}/items', [TopbarController::class, 'storeItem'])->name('items.store');
        Route::put('/items/{item}', [TopbarController::class, 'updateItem'])->name('items.update');
        Route::patch('/items/{item}/toggle', [TopbarController::class, 'toggleItem'])->name('items.toggle');
        Route::post('/sections/{section}/items/reorder', [TopbarController::class, 'reorderItems'])->name('items.reorder');
        Route::delete('/items/{item}', [TopbarController::class, 'destroyItem'])->name('items.destroy');
    });


    /*
    |--------------------------------------------------------------------------
    | Booking & Contact Info
    |--------------------------------------------------------------------------
    */
    Route::prefix('admin')->name('admin.')->group(function () {
        // Old Contact Queries
        Route::get('/queries', [ContactQueryController::class, 'index'])->name('queries.index');
        Route::patch('/queries/{query}/toggle', [ContactQueryController::class, 'toggleRead'])->name('queries.toggle');

        // Booking Appointments
        Route::get('/booking-appointments', [QueryController::class, 'index'])->name('booking.index');
        Route::patch('/booking-appointments/{query}/toggle', [QueryController::class, 'toggle'])->name('booking.toggle');
        Route::delete('/booking-appointments/{query}', [QueryController::class, 'destroy'])->name('booking.destroy');

        // Contact Info
        Route::get('/contact-info', [ContactInfoController::class, 'edit'])->name('contact.edit');
        Route::post('/contact-info', [ContactInfoController::class, 'update'])->name('contact.update');
    });


    /*
    |--------------------------------------------------------------------------
    | Blog Management
    |--------------------------------------------------------------------------
    */
    Route::prefix('admin/blog')->name('admin.blog.')->group(function () {
        Route::resource('categories', BlogCategoryController::class)->except(['show']);
        Route::resource('posts', BlogPostController::class)->except(['show']);
    });
    

    /*
    |--------------------------------------------------------------------------
    | Newsletter (Read Only)
    |--------------------------------------------------------------------------
    */
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('newsletter', [NewsletterController::class,'index'])->name('newsletter.index');
    });

    /*
    |--------------------------------------------------------------------------
    | User Details & Progress
    |--------------------------------------------------------------------------
    */
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('user-details', [UserDetailsController::class, 'index'])->name('user-details.index');
        Route::get('user-details/{id}', [UserDetailsController::class, 'show'])->name('user-details.show');
        Route::delete('user-details/{id}', [UserDetailsController::class, 'destroy'])->name('user-details.destroy');
    });

    /*
    |--------------------------------------------------------------------------
    | Quiz Manager
    |--------------------------------------------------------------------------
    */
    Route::prefix('admin/quiz')->name('admin.quiz.')->group(function () {
        Route::get('/', [QuizController::class, 'index'])->name('index');
        Route::post('/', [QuizController::class, 'store'])->name('store');
        Route::get('/{id}/edit', [QuizController::class, 'edit'])->name('edit');
        Route::put('/{id}', [QuizController::class, 'update'])->name('update');
        Route::delete('/{id}', [QuizController::class, 'destroy'])->name('destroy');
        Route::post('/{id}/toggle-publish', [QuizController::class, 'togglePublish'])->name('toggle-publish');
        Route::get('/{id}/json', [QuizController::class, 'getQuiz'])->name('json');
        Route::post('/{id}/save', [QuizController::class, 'saveQuiz'])->name('save');
        Route::post('/{quizId}/question', [QuizController::class, 'addQuestion'])->name('question.add');
        Route::put('/question/{questionId}', [QuizController::class, 'updateQuestion'])->name('question.update');
        Route::delete('/question/{questionId}', [QuizController::class, 'deleteQuestion'])->name('question.delete');
        Route::put('/option/{optionId}', [QuizController::class, 'updateOption'])->name('option.update');
    });

    /*
    |--------------------------------------------------------------------------
    | Signup Form Config
    |--------------------------------------------------------------------------
    */
    Route::prefix('admin/signup-config')->name('admin.signup-config.')->group(function () {
        Route::get('/', [SignupConfigController::class, 'index'])->name('index');
        Route::post('/field', [SignupConfigController::class, 'storeField'])->name('field.store');
        Route::put('/field/{id}', [SignupConfigController::class, 'updateField'])->name('field.update');
        Route::delete('/field/{id}', [SignupConfigController::class, 'deleteField'])->name('field.delete');
        Route::post('/field/reorder', [SignupConfigController::class, 'reorderFields'])->name('field.reorder');
        Route::post('/category', [SignupConfigController::class, 'storeCategory'])->name('category.store');
        Route::put('/category/{id}', [SignupConfigController::class, 'updateCategory'])->name('category.update');
        Route::delete('/category/{id}', [SignupConfigController::class, 'deleteCategory'])->name('category.delete');
    });
});
