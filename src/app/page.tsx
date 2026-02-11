"use client"

import Welcome from '../../components/Welcome';

function App() {

  console.log(process.env.AUTH0_CLIENT_ID)

  return (
    <main className="w-screen h-screen flex justify-center items-center">
        <Welcome/>
    </main>
  );
}

export default App;