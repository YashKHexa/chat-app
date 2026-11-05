import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AntdConfigProvider } from "./providers/AntdConfigProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <AntdConfigProvider>
    <App />
  </AntdConfigProvider>
);
