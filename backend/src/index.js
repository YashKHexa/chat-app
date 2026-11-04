import { config } from "./config/index.js";
import { initSocket } from "./socket/index.js";

initSocket(config.port);

console.log(`Socket.IO server running on port ${config.port}`);
