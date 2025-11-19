import { BadgeX, MoveRight, Send, Smile, SquarePen } from "lucide-react";
import { useState, type JSX } from "react";
import type { Chat, Message } from "../types";

interface ChatBotAppProps {
  chats: Chat[];
  onSetChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  onSetActiveChat: React.Dispatch<React.SetStateAction<string | null>>;
  onEndChat: () => void;
  activeChat: string | null;
  onNewChat: () => void;
}

function ChatBotApp({
  onEndChat,
  chats,
  onSetChats,
  activeChat,
  onNewChat,
  onSetActiveChat,
}: ChatBotAppProps): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("");

  const activeChatObj =
    chats.find((chat) => chat.id === activeChat) ?? chats[0];
  const messages = activeChatObj.messages || chats[0].messages;

  const handleGoBackClick = (): void => {
    onEndChat();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleDeleteChat = (
    event: React.MouseEvent<SVGSVGElement> | undefined,
    deletedChat_id: string
  ): void => {
    event?.stopPropagation();
    const updatedChats: Chat[] = chats.filter(
      (chat) => chat.id !== deletedChat_id
    );
    onSetChats(updatedChats);

    if (deletedChat_id === activeChat) {
      if (updatedChats.length > 0) {
        const newActiveChat = updatedChats[0].id;
        onSetActiveChat(newActiveChat);
      } else {
        onSetActiveChat(null);
        onEndChat();
      }
    }
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

    setInputValue("");
    onSetChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChatObj?.id
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      )
    );
  };

  return (
    <div className="flex min-h-screen text-[#FEFAE0]">
      <div className="flex flex-col space-y-4 w-1/3 p-10 bg-[#283618]">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl uppercase">Chat List</h2>
          <SquarePen
            onClick={onNewChat}
            className="cursor-pointer hover:scale-105 transition-all duration-150"
          />
        </div>

        {chats.map((chat) => {
          return (
            <div
              onClick={() => onSetActiveChat(chat.id)}
              key={chat.id}
              className={`flex justify-between bg-[#DDA15E] h-16 pl-4 py-2 pr-1 rounded-md ${
                chat.id === activeChat ? "active" : ""
              }`}
            >
              <h4 className="text-lg tracking-wide">{chat.displayId}</h4>
              <BadgeX
                onClick={(e) => handleDeleteChat(e, chat.id)}
                className="cursor-pointer hover:scale-105 transition-all duration-150"
              />
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
          <button type="submit">
            <Send className="cursor-pointer hover:scale-105 transition-all duration-150" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatBotApp;
