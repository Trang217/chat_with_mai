export interface Chat {
  id: string;
  messages: Message[];
}

export interface Message {
  type: "prompt" | "response";
  text: string;
  timestamp: string;
}
