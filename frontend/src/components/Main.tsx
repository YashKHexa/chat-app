import { Divider } from "antd";
import UserList from "./userList/UserList";
import ChatOneOfOne from "./chatOneOfOne/ChatOneOfOne";

const Main = () => {
  return (
    <div className="w-full max-w-270 h-[calc(100%-40px)] bg-background shadow overflow-hidden flex">
      <UserList />
      <Divider type="vertical" className="h-full m-0" />
      <ChatOneOfOne />
    </div>
  );
};

export default Main;
