<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\NewPasswordRequest;
use App\Http\Requests\Auth\PasswordResetRequest;
use App\Notifications\SendOtpNotification;
use App\Traits\HttpAuthResponses;
use Dkpankaj\Otp\Otp;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\RateLimiter;



class PasswordResetController extends Controller
{
	use HttpAuthResponses;
	private $otp;

	public function __construct()
	{
		$this->otp = new Otp();
	}
	public function store(PasswordResetRequest $request)
	{
		// $user->notify(new SendPasswordResetLink(url('/reset-password?token=', $token)));

	}

	public function sendPasswordResetOtpEmail(PasswordResetRequest $request)
	{

		$request->ensureIsNotRateLimited();
		RateLimiter::hit($request->throttleKey());

		$user = User::where("email", $request->only('email'))->first();
		$status = $user->notify(
			new SendOtpNotification(
				$this->otp->generate(
					$user->email,
					config('otp.otp_length'),
					config('otp.otp_expiration')
				)
			)
		);

		return $this->sendSuccess("OTP Generated", ["email" => $request->email]);

	}

	public function resetPassword(NewPasswordRequest $request)
	{

		$request->ensureIsNotRateLimited();

		$status = $this->otp->validate($request->email, $request->otp);

		if ($status->status) {
			$user = User::where('email', $request->only("email"))->first();
			$user->forceFill([
				'password' => Hash::make($request->password)
			])->setRememberToken(Str::random(60));

			$user->save();
			RateLimiter::clear($request->throttleKey());
			return $this->sendSuccess("password updated");
		}

		RateLimiter::hit($request->throttleKey());
		return $this->sendError($status->message);

	}



}
