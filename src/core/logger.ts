import { createLogger, format, transports } from 'winston';
import fs from 'fs';
import path from 'path';
import { environment, logDirectory } from '../config';
import DailyRotateFile from 'winston-daily-rotate-file';

let dir = logDirectory;
if (!dir) dir = path.resolve('logs');

// create directory if it is not present
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const logLevel = environment === 'development' ? 'debug' : 'warn';

const options = {
  file: {
    level: logLevel,
    filename: `${dir}/%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    utc: true,
    zippedArchive: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    prettyPrint: true,
    json: true,
    // maxSize: '20m',
    // maxFiles: '14d',
    format: format.combine(
      format.printf(info => { return `${(new Date()).toISOString()} || ${info.level} || Message: ${info.message}`; })
    )
  }
};

const logger = createLogger({
  transports: [
    new transports.DailyRotateFile(options.file)
  ],
  exceptionHandlers: [new DailyRotateFile(options.file)],
  exitOnError: false, // do not exit on handled exceptions
});

export default logger;