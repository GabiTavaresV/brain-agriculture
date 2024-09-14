import { app } from "./app";
import { ConnectionTypeORM } from "./database/connection-typeorm";

const connection = ConnectionTypeORM.getInstance().startConnection();

connection.then(() => {
  app.listen(3000, () => {
    console.info("Server running...");
  });
});
