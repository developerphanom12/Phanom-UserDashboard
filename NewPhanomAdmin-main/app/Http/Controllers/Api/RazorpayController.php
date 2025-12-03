<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Payment;

class RazorpayController extends Controller {
    // POST /api/razorpay/order
    public function createOrder(Request $req){
        $req->validate(['amount'=>'required|numeric']); // rupees
        $amountInPaise = intval($req->input('amount') * 100);

        $key = env('RAZORPAY_KEY_ID');
        $secret = env('RAZORPAY_KEY_SECRET');
        if(!$key || !$secret){
            return response()->json(['ok'=>false,'message'=>'Razorpay keys missing'],500);
        }

        // create order
        $resp = Http::withBasicAuth($key,$secret)
            ->post('https://api.razorpay.com/v1/orders', [
                'amount' => $amountInPaise,
                'currency' => 'INR',
                'receipt' => 'rcpt_'.time(),
                'payment_capture' => 1,
            ]);

        if(!$resp->ok()){
            return response()->json(['ok'=>false,'error'=>$resp->body()], 500);
        }
        $json = $resp->json();

        // store payment entry
        $p = Payment::create([
            'user_id' => $req->user() ? $req->user()->id : null,
            'razorpay_order_id' => $json['id'],
            'amount' => $req->input('amount'),
            'currency' => 'INR',
            'status' => 'created'
        ]);

        return response()->json(['ok'=>true,'order'=>$json,'payment'=>$p, 'razorpay_key' => $key]);
    }

    // POST /api/razorpay/verify
    public function verify(Request $req){
        $req->validate([
            'razorpay_order_id'=>'required',
            'razorpay_payment_id'=>'required',
            'razorpay_signature'=>'required',
        ]);

        $order_id = $req->input('razorpay_order_id');
        $payment_id = $req->input('razorpay_payment_id');
        $signature = $req->input('razorpay_signature');
        $secret = env('RAZORPAY_KEY_SECRET');

        // verify signature: hmac_sha256(order_id|payment_id, secret)
        $payload = $order_id . '|' . $payment_id;
        $expected = hash_hmac('sha256', $payload, $secret);

        $ok = hash_equals($expected, $signature);

        $payment = Payment::where('razorpay_order_id',$order_id)->first();
        if(!$payment) {
            return response()->json(['ok'=>false,'message'=>'Payment record not found'],404);
        }

        if($ok){
            $payment->update([
                'razorpay_payment_id'=>$payment_id,
                'razorpay_signature'=>$signature,
                'status'=>'paid'
            ]);
            // mark user profile paid
            if($req->user()){
                $profile = $req->user()->freelancerProfile;
                if($profile){
                    $profile->update(['is_paid'=>true]);
                }
            }
            return response()->json(['ok'=>true,'payment'=>$payment]);
        } else {
            $payment->update(['status'=>'failed']);
            return response()->json(['ok'=>false,'message'=>'Signature mismatch'],400);
        }
    }
}
