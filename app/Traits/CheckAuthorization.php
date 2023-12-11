<?PHP

namespace App\Traits;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Gate;

trait CheckAuthorization
{
    use HttpResponses;
    public function authorizetionForUser($ability,$argument = null)
    {
        if(!Gate::allows($ability,$argument)){
            throw new HttpResponseException( 
                response()->json(["status" => false,"message"=> "Unauthorize"],403)
            );
        }
    }

}
