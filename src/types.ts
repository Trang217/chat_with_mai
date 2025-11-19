export interface Chat {
  id: string;
  displayId: string;
  messages: Message[];
}

export interface Message {
  type: "prompt" | "response";
  text: string;
  timestamp: string;
}
