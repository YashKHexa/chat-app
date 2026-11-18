import Main from "@/components/Main";
import { Popup } from "@/popup/Popup";
import { useState } from "react";
import { ThemeSwitcher } from "@/themeprovide/ThemeSwitcher";
import { useChat } from "@/context/ChatContext";

const Home = () => {
  const { setCurrentUserName } = useChat();
  const [popupDone, setPopupDone] = useState<boolean>(false);

  if (!popupDone) {
    return (
      <div className="w-full h-svh bg-background-secondary flex justify-center items-center">
        {/* Theme switcher — top right corner */}
        <div className="absolute top-4 right-4">
          <ThemeSwitcher />
        </div>
        <Popup
          open={true}
          onContinue={(name) => {
            setCurrentUserName(name);
            setPopupDone(true);
          }}
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
