<?php

namespace App\Listeners;

use App\Events\UserLoginEvent;
use Illuminate\Support\Facades\DB;

class UserLoginHistory
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\UserLoginEvent  $event
     * @return void
     */
    public function handle(UserLoginEvent $event)
    {
        DB::table('login_histories')->insert([
            'email' => $event->user->email,
            'login_time' => now(),
            'ip' => $event->ip
        ]);
    }
}
