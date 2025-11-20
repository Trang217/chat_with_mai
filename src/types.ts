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

export interface Emoji {
  id: string;
  keywords: string[];
  name: string;
  native: string;
  unified: string;
  emoticons: string[];
  shortcodes: string;
}
