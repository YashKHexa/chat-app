import Home from "./pages/Home";
import { ChatProvider } from "./context/ChatContext";

function App() {
  return (
    <ChatProvider>
      <Home />
    </ChatProvider>
  );
}

export default App;
