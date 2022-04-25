import './paths';
import { port } from './config';
import app from './app';
import Logger from './core/logger';
import db from './database';

const initDatabase = async () => {
  await db.connectDatabase().then(
    () => {
      app.listen(port, () => {
        Logger.info(`Server running on port : ${port}`);
        console.log(`Server running on port : ${port}`);
      })
      .on('error', (e) => Logger.error(e));
    }
  )
}
initDatabase();