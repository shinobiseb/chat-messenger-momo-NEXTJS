import { signIn } from "@/auth"

export default function LoginButton() {

  return (
    <form
      action={async () => {
        "use server"
        await signIn("auth0", { redirectTo : "/chats"})
      }}
    >
      <button
        type="submit"
        className="bg-white button-hover rounded-xl text-lg font-semibold px-4 p-2 flex flex-row justify-center items-center drop-shadow-md text-center"
      >
        Sign In With Auth0
      </button>
    </form>
  )
}