import express from 'express';
import cors from 'cors';
import logger from './core/logger';
import routes from './routes';

process.on('uncaughtException', (e) => {
  logger.error(e);
});

const app = express();

app.use(cors())
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));

// Routes
app.use(routes);

export default app;
