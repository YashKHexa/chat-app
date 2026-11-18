import Main from "@/components/Main";
import { Popup } from "@/popup/Popup";
import { useEffect, useRef, useState } from "react";
import type { Socket } from "socket.io-client";
import { connectsocket } from "@/services/socket";
import { ThemeSwitcher } from "@/themeprovide/ThemeSwitcher";

const Home = () => {
  const socket = useRef<Socket | null>(null);

  // hamesha popup pehle dikhao
  const [popupDone, setPopupDone] = useState<boolean>(false);

  useEffect(() => {
    if (!popupDone) return;

    const name = localStorage.getItem('chat_username') || '';
    socket.current = connectsocket();

    socket.current.on('connect', () => {
      console.log('✅ Socket connected:', socket.current?.id);
      console.log('🚀 Joining room as:', name);
      socket.current?.emit('joinRoom', name);
    });

    socket.current.on('roomNotice', (newUser: string) => {
      console.log(`📢 Notice: ${newUser} joined the group!`);
    });

    socket.current.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });

    socket.current.on('connect_error', (err) => {
      console.log('⚠️ Connection error:', err.message);
    });

    return () => {
      socket.current?.disconnect();
    };
  }, [popupDone]);

  if (!popupDone) {
    return (
      <div className="w-full h-svh bg-background-secondary flex justify-center items-center">
        {/* Theme switcher — top right corner */}
        <div className="absolute top-4 right-4">
          <ThemeSwitcher />
        </div>
        <Popup
          open={true}
          onContinue={() => setPopupDone(true)}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-svh bg-background-secondary flex justify-center items-center">
      <Main />
    </div>
  );
};

export default Home;
