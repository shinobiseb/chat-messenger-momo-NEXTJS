import { signInProps } from '@/types/types';
import GoogleIcon from '../public/GoogleIcon';
import testConnection from '@/lib/mongo/test-connection';

export default function Welcome( {setSignedIn, signInState} : signInProps ) {

  return (
    <div className="bg-orange w-11/12 max-w-xl h-60 rounded-xl flex flex-col justify-around items-center py-4 drop-shadow-md">
      <h2 className="text-white text-xl uppercase font-semibold mt-4">Welcome to MauChat!</h2>
      <section className='h-2/3 w-5/6 flex flex-col items-center justify-evenly'>
        <button
          id="SignInButton"
          className="bg-white rounded-xl text-lg font-semibold px-4 p-2 flex flex-row justify-between overflow-hidden items-center drop-shadow-md"
        onClick={()=> {
            setSignedIn('Sketch')
          }}
        >
          <p className="mr-3">Sign In with Google</p>
          <GoogleIcon widthString="40" heightString="40" />
        </button>
        <a
          id="SignInButton"
          className="bg-white rounded-xl text-lg font-semibold px-4 p-2 flex flex-row justify-between items-center drop-shadow-md text-center"
        href='/Signup'>
          Sign Up
        </a>
      </section>
    </div>
  );
}