import { useState, type JSX } from "react";
import ChatBotStart from "./components/ChatBotStart";
import ChatBotApp from "./components/ChatBotApp";
import type { Chat } from "./types";
import { v4 as uuidv4 } from "uuid";

function App(): JSX.Element {
  const [isChatting, setIsChatting] = useState<boolean>(false);
  const [chats, setChats] = useState<Chat[]>(() => {
    const storedData = localStorage.getItem("chats");
    const storedChats: Chat[] = storedData ? JSON.parse(storedData) : [];
    return storedChats;
  });
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const handleStartChat = (): void => {
    setIsChatting(true);

    if (chats.length === 0) {
      createNewChat();
    }
  };

  const handleEndChat = (): void => {
    setIsChatting(false);
  };

  const createNewChat = (): void => {
    const newChat: Chat = {
      id: uuidv4(),
      displayId: `Chat ${new Date().toLocaleDateString(
        "en-GB"
      )} ${new Date().toLocaleTimeString()}`,
      messages: [],
    };

    const updatedChats: Chat[] = [newChat, ...chats];
    setChats(updatedChats);
    localStorage.setItem("chats", JSON.stringify(updatedChats));

    setActiveChat(newChat.id);
  };

  return (
    <div className="font-lato">
      {isChatting ? (
        <ChatBotApp
          onEndChat={handleEndChat}
          chats={chats}
          onSetChats={setChats}
          activeChat={activeChat}
          onNewChat={createNewChat}
          onSetActiveChat={setActiveChat}
        />
      ) : (
        <ChatBotStart onStartChat={handleStartChat} />
      )}
    </div>
  );
}

export default App;
