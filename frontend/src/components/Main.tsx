import { Divider } from "antd";
import Popup from "@/popup/Popup";
import UserList from "./userList/UserList";
import ChatOneOfOne from "./chatOneOfOne/ChatOneOfOne";
import { ChatProvider } from "@/context/ChatContext";

const Main = () => {
  return (
    <ChatProvider>
      <div className="w-full max-w-[1080px] h-[calc(100%-40px)] bg-background rounded-[20px] border border-border shadow-2xl overflow-hidden flex">
        <Popup />
        <UserList />
        <Divider type="vertical" className="!h-full !m-0 !border-border" />
        <ChatOneOfOne />
      </div>
    </ChatProvider>
  );
};

export default Main;
