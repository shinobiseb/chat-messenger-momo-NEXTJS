import { signInProps } from '../src/types/types'
import GoogleIcon from '../public/GoogleIcon';

export default function Welcome( {setSignedIn, signInState} : signInProps ) {

  return (
    <div className="bg-orange w-11/12 h-60 rounded-xl flex flex-col justify-between items-center py-12 drop-shadow-md border">
      <h2 className="text-white text-6xl uppercase">Welcome!</h2>
      <button
        id="SignInButton"
        className="bg-white rounded-xl py-3 px-4  flex flex-row justify-between overflow-hidden items-center drop-shadow-md"
        onClick={()=> {
          setSignedIn(!signInState)
        }}
      >
        <p className="mr-5 text-2xl font-semibold">Sign In With Google</p>
        <GoogleIcon widthString="40" heightString="40" />
      </button>
    </div>
  );
}