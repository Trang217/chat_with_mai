import { type JSX } from "react";

interface ChatBotStartProps {
  onStartChat: () => void;
}

function ChatBotStart({ onStartChat }: ChatBotStartProps): JSX.Element {
  const handleClick = (): void => {
    onStartChat();
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-100">
      <button
        onClick={handleClick}
        className=" font-lato font-bold  bg-orange-200 text-violet-800 text-xl md:text-5xl uppercase py-8 px-10 md:py-16 md:px-20 rounded-xl shadow-xl cursor-pointer hover:scale-105 transition duration-200 hover:shadow-2xl"
      >
        Chat with Mai
      </button>
    </div>
  );
}

export default ChatBotStart;
