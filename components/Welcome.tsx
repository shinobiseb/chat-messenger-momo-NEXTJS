import { signInProps } from '@/types/types';
import GoogleIcon from '../public/GoogleIcon';

export default function Welcome() {

  return (
    <div className="bg-orange w-11/12 max-w-xl h-60 rounded-xl flex flex-col justify-around items-center py-4 drop-shadow-md">
      <h2 className="text-white text-4xl uppercase font-semibold mt-4"> MauChat!</h2>
      <section className='h-2/3 w-5/6 flex flex-col items-center justify-evenly'>
        <a
          id="SignInButton"
          className="bg-white rounded-xl text-lg font-semibold px-4 p-2 flex flex-row justify-between overflow-hidden items-center drop-shadow-md"
          href='/SignIn'
        >
          <p>Sign In</p>
          {/* <GoogleIcon widthString="40" heightString="40" /> */}
        </a>
        <a
          id="SignInButton"
          className="bg-white rounded-xl text-lg font-semibold px-4 p-2 flex flex-row justify-between items-center drop-shadow-md text-center"
        href='/SignUp'>
          Sign Up
        </a>
      </section>
    </div>
  );
}