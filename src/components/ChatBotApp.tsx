import {
  ArrowBigRight,
  BadgeX,
  FilePlusCorner,
  Send,
  Smile,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type JSX } from "react";
import type { Chat, Message, Emoji } from "../types";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

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
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const activeChatObj =
    chats.find((chat) => chat.id === activeChat) ?? chats[0] ?? null;
  const messages: Message[] = useMemo(
    () => activeChatObj.messages ?? [],
    [activeChatObj]
  );

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
    localStorage.setItem("chats", JSON.stringify(updatedChats));

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

  const handleEmojiSelect = (emoji: Emoji): void => {
    setInputValue((prevInput) => prevInput + emoji.native);
  };

  const sendMessages = async (event: React.FormEvent<HTMLFormElement>) => {
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
    onSetChats((prevChats) => {
      const updatedChats: Chat[] = prevChats.map((chat) =>
        chat.id === activeChatObj?.id
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      );
      localStorage.setItem("chats", JSON.stringify(updatedChats));
      return updatedChats;
    });

    setIsTyping(true);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: inputValue }],
            max_tokens: 500,
          }),
        }
      );

      const data = await response.json();
      const chatResponse = data.choices[0].message.content.trim();

      const newResponse: Message = {
        type: "response",
        text: chatResponse,
        timestamp: new Date().toLocaleTimeString(),
      };

      onSetChats((prevChats) => {
        const updatedChats: Chat[] = prevChats.map((chat) =>
          chat.id === activeChat
            ? { ...chat, messages: [...chat.messages, newResponse] }
            : chat
        );
        localStorage.setItem("chats", JSON.stringify(updatedChats));
        return updatedChats;
      });

      setIsTyping(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeChat]);

  return (
    <div className="flex min-h-screen text-amber-900 bg-amber-100 ">
      <div className="hidden md:flex flex-col space-y-4 w-1/3 py-6 px-5 bg-amber-50 border-r-4 border-double border-r-amber-500">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-lato font-bold text-xl uppercase">Chat List</h2>

          <div className="relative group cursor-pointer inline-block">
            <FilePlusCorner
              onClick={onNewChat}
              className="cursor-pointer hover:scale-105 transition-all duration-150 text-purple-800"
            />

            {/* tooltip */}
            <span className=" absolute left-1/2 -translate-x-1/2 top-[120%] opacity-0 group-hover:opacity-100 transition-all duration-200 text-sm px-2 py-1 rounded whitespace-nowrap ">
              Create Chat
            </span>
          </div>
        </div>

        {chats.map((chat) => {
          return (
            <div
              onClick={() => onSetActiveChat(chat.id)}
              key={chat.id}
              className={`flex items-center justify-around bg-amber-400 h-12 pl-4 py-2 pr-1 cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-150 rounded-full ${
                chat.id === activeChat ? "active" : ""
              }`}
            >
              <h4 className="text-sm lg:text-lg tracking-wide">
                {chat.displayId}
              </h4>
              <BadgeX
                onClick={(e) => handleDeleteChat(e, chat.id)}
                className="cursor-pointer hover:scale-105 transition-all duration-150"
              />
            </div>
          );
        })}
      </div>

      <div className="flex flex-col w-full md:w-2/3 bg-amber-100">
        <div className="flex items-center justify-between py-6 pr-4 pl-2">
          <h3 className="text-xl font-bold uppercase">Chat with Mai</h3>
          <ArrowBigRight
            onClick={handleGoBackClick}
            className="cursor-pointer w-8 h-8 hover:scale-105 transition-all duration-150 text-purple-800"
          />
        </div>

        <div className="flex flex-col space-y-4 p-4 grow">
          {messages.map((message, index) => {
            return (
              <div key={index} className={` text-lg font-lato ${message.type}`}>
                {message.text}
                <span className="text-md block">{message.timestamp}</span>
              </div>
            );
          })}

          {isTyping && (
            <div className="font-lato text-lg mt-auto">Typing...</div>
          )}

          <div ref={chatEndRef}></div>
        </div>

        <form
          onSubmit={sendMessages}
          className="relative flex justify-between items-center space-x-3 px-4 w-full h-30 bg-yellow-50 "
        >
          <Smile
            className="cursor-pointer text-purple-800"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          />
          {showEmojiPicker && (
            <div className="picker absolute bottom-[80%] left-8">
              <Picker data={data} onEmojiSelect={handleEmojiSelect} />
            </div>
          )}
          <input
            className="flex-1 outline-none text-xl placeholder:text-lg placeholder:text-amber-800 px-2"
            type="text"
            onChange={handleInputChange}
            value={inputValue}
            placeholder="Type a message..."
            onFocus={() => setShowEmojiPicker(false)}
          />
          <button type="submit">
            <Send className="cursor-pointer text-purple-800 hover:scale-105 transition-all duration-150" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatBotApp;
