import Popup from "@/popup/Popup";
import UserList from "./userList/UserList";
import ChatOneOfOne from "./chatOneOfOne/ChatOneOfOne";

const Main = () => {
  return (
    <div className="w-full h-full md:rounded-2xl md:border md:border-border md:shadow-lg lg:max-w-[1080px] lg:h-[calc(100%-40px)] lg:rounded-[20px] lg:shadow-2xl bg-background overflow-hidden flex">
      <Popup />
      <UserList />
      <div className="w-[1px] h-full bg-border hidden md:block shrink-0" />
      <ChatOneOfOne />
    </div>
  );
};

export default Main;
