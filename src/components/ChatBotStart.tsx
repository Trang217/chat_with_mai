import { type JSX } from "react";

function ChatBotStart(): JSX.Element {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#283618]">
      <button className=" font-sans font-bold bg-[#DDA15E] text-[#FEFAE0] text-5xl uppercase py-16 px-20 rounded-xl shadow-xl cursor-pointer hover:scale-105 transition duration-200 hover:shadow-2xl">
        Chat with Mai
      </button>
    </div>
  );
}

export default ChatBotStart;
