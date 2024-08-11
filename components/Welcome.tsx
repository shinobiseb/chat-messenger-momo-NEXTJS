import { signInProps } from '@/types/types';
import GoogleIcon from '../public/GoogleIcon';

export default function Welcome( {setSignedIn, signInState} : signInProps ) {

  return (
    <div className="bg-orange w-11/12 h-60 rounded-xl flex flex-col justify-around items-center py-12 drop-shadow-md">
      <h2 className="text-white text-5xl uppercase font-semibold">Welcome!</h2>
      {/* <button
        id="SignInButton"
        className="bg-white rounded-xl text-2xl font-semibold w-11/12 py-3 px-4 flex flex-row justify-between overflow-hidden items-center drop-shadow-md"
        onClick={()=> {
          
        }}
      >
        <p className="mr-3">Sign In with Google</p>
        <GoogleIcon widthString="40" heightString="40" />
      </button> */}
      <button
        id="SignInButton"
        className="bg-white rounded-xl text-2xl font-semibold py-3 px-4 flex flex-row justify-between overflow-hidden items-center drop-shadow-md text-center"
        onClick={()=> {
        }}>
        Sign Up
      </button>
    </div>
  );
}