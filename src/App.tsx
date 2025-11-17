import { useState, type JSX } from "react";
import ChatBotStart from "./components/ChatBotStart";
import ChatBotApp from "./components/ChatBotApp";

function App(): JSX.Element {
  const [isChatting, setIsChatting] = useState<boolean>(false);
  const handleStartChat = (): void => {
    setIsChatting(true);
  };

  const handleEndChat = (): void => {
    setIsChatting(false);
  };

  return (
    <div>
      {isChatting ? (
        <ChatBotApp onEndChat={handleEndChat} />
      ) : (
        <ChatBotStart onStartChat={handleStartChat} />
      )}
    </div>
  );
}

export default App;
