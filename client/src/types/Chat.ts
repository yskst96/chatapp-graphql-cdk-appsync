export type Message = {
    id: string;
    content: string;
    owner: string;
    createdAt: string;
    roomId: string;
  };
  
  export type Room = {
    id: string;
    name: string;
    messages: Message[];
    createdAt: string;
    updatedAt: string;
  };