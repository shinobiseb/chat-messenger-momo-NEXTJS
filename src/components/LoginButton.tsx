import { signIn } from "@/auth"

export default function LoginButton() {

  return (
    <form
      action={async () => {
        "use server"
        await signIn("auth0", { redirectTo: "/chats" }, { prompt: "login"});
      }}
    >
      <button
        type="submit"
        className="bg-orange text-white transition-colors hover:bg-darkgray text-lg px-10 p-2 flex flex-row justify-center items-center drop-shadow-md text-center"
      >
        Sign In With Auth0
      </button>
    </form>
  )
}