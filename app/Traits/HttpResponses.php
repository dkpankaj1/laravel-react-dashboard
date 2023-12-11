<?PHP

namespace App\Traits;

trait HttpResponses
{
    public function success($message = null, $data = null, $code = 200)
    {
        return response()->json(
            [
                "status" => $code,
                "message" => $message,
                "data" => $data
            ],
            $code
        );
    }

    public function error($message = null, $error= null, $code)
    {
        return response()->json(
            [
                "status" => $code,
                "message" => $message,
                "data" => $error
            ],
            $code
        );
    }
}
