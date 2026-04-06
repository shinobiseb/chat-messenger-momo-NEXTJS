import LoginButton from "./LoginButton";

export default function Welcome() {

  return (
    <div className="bg-white w-full sm:w-2/3 max-w-lg h-56 flex flex-col items-center py-8 justify-around">
      <span className="text-gray italic absolute right-3 bottom-1">V0.2</span>
      <h2 className="text-5xl uppercase font-semibold mt-4"> MauChat!</h2>
      <LoginButton/>
    </div>
  );
}