import * as dotenv from 'dotenv';

dotenv.config();
import { app } from './app';
import { ConnectionTypeORM } from './database/connection-typeorm';

const connection = ConnectionTypeORM.getInstance();

connection
  .startConnection()
  .then(() => {
    app.listen(3000, () => {
      console.info('Server running...');
    });
  })
  .catch((error) => {
    console.error('Error initializing TypeORM connection:', error);
  });
