<?PHP

namespace App\Traits;
use Illuminate\Http\Exceptions\HttpResponseException;

trait HttpAuthResponses
{
    public function sendSuccess($message = null, $data = [], $code = 200)
    {
        $response = [ "status"=> $code,"message" => $message ];

        if(!empty($data)) {
            $response["data"] = $data;
        }

        return response()->json($response, $code);
    }

    public function sendError($message = null, $errors = [], $code = 401)
    {
        $response = [ "status"=> $code,"message" => $message ];

        if(!empty($errors)) {
            $response["errors"] = $errors;
        }
        
        throw new HttpResponseException(response()->json($response,$code));
    }
}
