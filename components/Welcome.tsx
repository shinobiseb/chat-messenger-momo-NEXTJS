import LoginButton from "./LoginButton";

export default function Welcome() {

  return (
    <div className="bg-orange w-11/12 max-w-xl h-60 rounded-xl flex flex-col justify-around items-center py-4 drop-shadow-md">
      <h2 className="text-white text-4xl uppercase font-semibold mt-4"> MauChat!</h2>
      <span className="text-lightgray italic">V0.2</span>
        <LoginButton/>
    </div>
  );
}