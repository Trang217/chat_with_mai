import { useState, type JSX } from "react";
import ChatBotStart from "./components/ChatBotStart";
import ChatBotApp from "./components/ChatBotApp";
import type { Chat } from "./types";

function App(): JSX.Element {
  const [isChatting, setIsChatting] = useState<boolean>(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const handleStartChat = (): void => {
    setIsChatting(true);

    if (chats.length === 0) {
      const newChat: Chat = {
        id: `Chat ${new Date().toLocaleDateString(
          "en-GB"
        )} ${new Date().toLocaleTimeString()}`,
        messages: [],
      };

      setChats([newChat]);
    }
  };

  const handleEndChat = (): void => {
    setIsChatting(false);
  };

  return (
    <div>
      {isChatting ? (
        <ChatBotApp
          onEndChat={handleEndChat}
          chats={chats}
          onSetChats={setChats}
        />
      ) : (
        <ChatBotStart onStartChat={handleStartChat} />
      )}
    </div>
  );
}

export default App;
