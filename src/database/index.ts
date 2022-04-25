import mongoose from 'mongoose';
import { db } from '../config';
import Logger from '../core/logger';

const dbURI = `mongodb+srv://${db.user}:${encodeURIComponent(db.password)}@${db.host}/${db.name}`;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
};

const connectDatabase = async () => {
    try {
        await mongoose.connect(dbURI, options).then(
            () => {
                console.log('Mongoose connection done');
                Logger.info('Mongoose connection done');

                // If the Node process ends, close Mongoose connection
                process.on('SIGINT', () => {
                    mongoose.connection.close(() => {
                        console.log('Mongoose connection disconnected through app termination');
                        Logger.info('Mongoose connection disconnected through app termination');
                        process.exit(0);
                    });
                });
            },
            (error) => {
                console.log('Mongoose connection error');
                Logger.info('Mongoose connection error');
                Logger.error(error);
            }
        )
    } catch (error) {
        console.log('Mongoose connection error');
        Logger.info('Mongoose connection error');
        Logger.error(error);
    }
};

export default { connectDatabase };