export default function Welcome() {

  return (
    <div className="bg-orange w-11/12 max-w-xl h-60 rounded-xl flex flex-col justify-around items-center py-4 drop-shadow-md">
      <h2 className="text-white text-4xl uppercase font-semibold mt-4"> MauChat!</h2>
      <span className="text-lightgray italic">V0.1 - Alpha</span>
      <section className='welcome-items h-2/3 w-5/6 flex flex-col items-center justify-evenly'>
        <a
          id="SignInButton"
          className="bg-white button-hover rounded-xl text-lg font-semibold px-4 p-2 flex flex-row justify-center overflow-hidden items-center drop-shadow-md"
          href='/signin'
        >
          <p>Sign In</p>
        </a>
        <a
          id="SignInButton"
          className="bg-white button-hover rounded-xl text-lg font-semibold px-4 p-2 flex flex-row justify-center items-center drop-shadow-md text-center"
        href='/signup'>
          Sign Up
        </a>
      </section>
    </div>
  );
}