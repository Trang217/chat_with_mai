import { BadgeX, MoveRight, Send, Smile, SquarePen } from "lucide-react";
import { type JSX } from "react";

interface ChatBotAppProps {
  onEndChat: () => void;
}

function ChatBotApp({ onEndChat }: ChatBotAppProps): JSX.Element {
  const handleGoBackClick = (): void => {
    console.log("end");
    onEndChat();
  };
  return (
    <div className="flex min-h-screen text-[#FEFAE0]">
      <div className="flex flex-col space-y-4 w-1/3 p-10 bg-[#283618]">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl uppercase">Chat List</h2>
          <SquarePen className="cursor-pointer hover:scale-105 transition-all duration-150" />
        </div>

        <div className="flex justify-between bg-[#DDA15E] h-16 pl-4 py-2 pr-1 rounded-md active">
          <h4 className="text-lg tracking-wide">Chat 17/11/2025 15:06:42 PM</h4>
          <BadgeX className="cursor-pointer hover:scale-105 transition-all duration-150" />
        </div>

        <div className="flex justify-between bg-[#DDA15E] h-16 pl-4 py-2 pr-1 rounded-md">
          <h4 className="text-lg tracking-wide">Chat 17/11/2025 15:06:42 PM</h4>
          <BadgeX className="cursor-pointer hover:scale-105 transition-all duration-150" />
        </div>

        <div className="flex justify-between bg-[#DDA15E] h-16 pl-4 py-2 pr-1 rounded-md">
          <h4 className="text-lg tracking-wide">Chat 17/11/2025 15:06:42 PM</h4>
          <BadgeX className="cursor-pointer hover:scale-105 transition-all duration-150" />
        </div>

        <div className="flex justify-between bg-[#DDA15E] h-16 pl-4 py-2 pr-1 rounded-md">
          <h4 className="text-lg tracking-wide">Chat 17/11/2025 15:06:42 PM</h4>
          <BadgeX className="cursor-pointer hover:scale-105 transition-all duration-150" />
        </div>
      </div>

      <div className="flex flex-col pt-10 w-2/3 bg-[#303e02]">
        <div className="flex items-center justify-between px-4">
          <h3 className="text-xl">Chat with Mai</h3>
          <MoveRight
            onClick={handleGoBackClick}
            className="cursor-pointer w-8 h-8 hover:scale-105 transition-all duration-150"
          />
        </div>

        <div className="flex flex-col space-y-4 p-4 grow">
          <div className="prompt text-lg font-serif">
            Hi Mai, How are you?
            <span className="text-md block">12:29:51 PM</span>
          </div>

          <div className="response text-lg font-serif">
            Hello Trang, I am Okay at the moment, How can i assist you?
            <span className="text-md block">12:29:55 PM</span>
          </div>

          <div className="font-serif text-lg mt-auto">Typing...</div>
        </div>

        <form
          action=""
          className="flex justify-between items-center space-x-3 px-4 w-full h-30 bg-green-950"
        >
          <Smile />
          <input
            className="flex-1 outline-none text-xl placeholder:text-lg px-2"
            type="text"
            placeholder="Type a message..."
          />
          <Send className="cursor-pointer hover:scale-105 transition-all duration-150" />
        </form>
      </div>
    </div>
  );
}

export default ChatBotApp;
