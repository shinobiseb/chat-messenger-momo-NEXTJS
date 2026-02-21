import { auth, signIn, signOut } from "@/auth"

export default async function TestPage() {
  const session = await auth()

  return (
    <div className="p-10 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Auth Test Page</h1>
      
      {session ? (
        <div className="bg-green-100 p-4 rounded">
          <p>Signed in as: <strong>{session.user?.email}</strong></p>
          <form action={async () => {
            "use server"
            await signOut()
          }}>
            <button className="bg-red-500 text-white px-4 py-2 rounded mt-2">Sign Out</button>
          </form>
        </div>
      ) : (
        <div className="bg-gray-100 p-4 rounded">
          <p>You are not signed in.</p>
          <form action={async () => {
            "use server"
            await signIn("auth0")
          }}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Sign in with Auth0</button>
          </form>
        </div>
      )}

      <details className="mt-10">
        <summary>View Raw Session Data</summary>
        <pre className="bg-black text-white p-4 rounded mt-2 text-xs">
          {JSON.stringify(session, null, 2)}
        </pre>
      </details>
    </div>
  )
}
