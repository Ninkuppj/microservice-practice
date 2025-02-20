
import { io } from "socket.io-client";
export const socketConfig = async (token: any) => {
    const socket = io('http://localhost:5000' as string, {
      autoConnect: false,
      extraHeaders: {
        ["Authorization"]:`Baerer ${token}`
      },
      
    });

    return socket;
  };