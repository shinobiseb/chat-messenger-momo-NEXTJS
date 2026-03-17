import { auth } from "@/auth";

export default async function EmptyChatPage() {  
  return (
    <div className="flex items-center justify-center h-full bg-gray-50 text-gray-500">
      <div className="text-center text-white bg-black p-10 bg-opacity-80">
        <h3 className="text-xl font-semibold">Your Messages</h3>
        <p>Select a conversation to start talking</p>
      </div>
    </div>
  );
}