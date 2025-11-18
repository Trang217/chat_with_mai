import { BadgeX, MoveRight, Send, Smile, SquarePen } from "lucide-react";
import { useState, type JSX } from "react";
import type { Chat, Message } from "../types";

interface ChatBotAppProps {
  chats: Chat[];
  onSetChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  onEndChat: () => void;
}

function ChatBotApp({
  onEndChat,
  chats,
  onSetChats,
}: ChatBotAppProps): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>(chats[0].messages);
  const handleGoBackClick = (): void => {
    onEndChat();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const sendMessages = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue.trim() === "") {
      return;
    }

    const newMessage: Message = {
      type: "prompt",
      text: inputValue,
      timestamp: new Date().toLocaleTimeString(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInputValue("");

    const updatedChats = chats.map((chat, index) => {
      if (index === 0) {
        return { ...chat, messages: updatedMessages };
      }

      return chat;
    });

    onSetChats(updatedChats);
  };

  return (
    <div className="flex min-h-screen text-[#FEFAE0]">
      <div className="flex flex-col space-y-4 w-1/3 p-10 bg-[#283618]">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl uppercase">Chat List</h2>
          <SquarePen className="cursor-pointer hover:scale-105 transition-all duration-150" />
        </div>

        {chats.map((chat, index) => {
          return (
            <div
              key={index}
              className={`flex justify-between bg-[#DDA15E] h-16 pl-4 py-2 pr-1 rounded-md ${
                index === 0 ? "active" : ""
              }`}
            >
              <h4 className="text-lg tracking-wide">{chat.id}</h4>
              <BadgeX className="cursor-pointer hover:scale-105 transition-all duration-150" />
            </div>
          );
        })}
      </div>

      <div className="flex flex-col w-2/3 bg-[#303e02]">
        <div className="flex items-center justify-between py-10 px-4 bg-[#2e3428]">
          <h3 className="text-xl">Chat with Mai</h3>
          <MoveRight
            onClick={handleGoBackClick}
            className="cursor-pointer w-8 h-8 hover:scale-105 transition-all duration-150"
          />
        </div>

        <div className="flex flex-col space-y-4 p-4 grow">
          {messages.map((message, index) => {
            return (
              <div
                key={index}
                className={`prompt text-lg font-serif ${message.type}`}
              >
                {message.text}
                <span className="text-md block">{message.timestamp}</span>
              </div>
            );
          })}
          {/* 
          <div className="response text-lg font-serif">
            Hello Trang, I am Okay at the moment, How can i assist you?
            <span className="text-md block">12:29:55 PM</span>
          </div> */}

          <div className="font-serif text-lg mt-auto">Typing...</div>
        </div>

        <form
          onSubmit={sendMessages}
          className="flex justify-between items-center space-x-3 px-4 w-full h-30 bg-green-950"
        >
          <Smile />
          <input
            className="flex-1 outline-none text-xl placeholder:text-lg px-2"
            type="text"
            onChange={handleInputChange}
            value={inputValue}
            placeholder="Type a message..."
          />
          <Send className="cursor-pointer hover:scale-105 transition-all duration-150" />
        </form>
      </div>
    </div>
  );
}

export default ChatBotApp;
