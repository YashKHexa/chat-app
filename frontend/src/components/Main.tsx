import { Divider } from "antd";
import Popup from "@/popup/Popup";
import UserList from "./userList/UserList";
import ChatOneOfOne from "./chatOneOfOne/ChatOneOfOne";
import { ChatProvider } from "@/context/ChatContext";

const Main = () => {
  return (
    <ChatProvider>
      <div className="w-full max-w-270 h-[calc(100%-40px)] bg-background shadow overflow-hidden flex">
        <Popup />
        <UserList />
        <Divider type="vertical" className="h-full m-0" />
        <ChatOneOfOne />
      </div>
    </ChatProvider>
  );
};

export default Main;
