import { initMongoConnection } from "./db/initMongoConnection.js";
import { setupServer } from "./server.js";


const bootstrap = async () => {
    initMongoConnection();
    setupServer();
};

bootstrap();