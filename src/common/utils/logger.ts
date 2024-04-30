import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import 'winston-daily-rotate-file';

// Helper function to serialize additional log arguments
const serializeArgs = (info) => {
  // Extracts all arguments except the first (message)
  const args = info[Symbol.for('splat')];
  return args ? args.map((arg) => JSON.stringify(arg, null, 2)).join(',') : '';
};

const customFormat = winston.format.printf((i) => {
  return `${i.level.toUpperCase()}: ${i.timestamp} ${i.message}`;
});

const myCustomFormat = winston.format.combine(
  winston.format.errors({ stack: true }), // Include error stack traces
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  winston.format.printf((info) => {
    // Check if there is a stack available (it's an error) and format accordingly
    // Also serialize and include all additional arguments
    return `${info.timestamp} ${info.level}: ${info.message}${
      info.stack ? '\n' + info.stack : ''
    } ${serializeArgs(info)}`;
  }),
);

// Log unhandled exceptions to separate file
const exceptionHandlers = [
  new winston.transports.DailyRotateFile({
    // name: 'Error Logs',
    filename: 'logs/exceptions/exceptions-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '128m',
    maxFiles: '14d',
  }),
];

// to seperate logging correctly per file
const filterLevelLogs = (filter) =>
  winston.format((info, opts) => {
    return info.level === filter ? info : false;
  });

var transports: (
  | DailyRotateFile
  | winston.transports.ConsoleTransportInstance
)[] = [
  new winston.transports.DailyRotateFile({
    filename: 'logs/error/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '128m',
    maxFiles: '14d',
    level: 'error',
    json: true,
    format: winston.format.combine(
      filterLevelLogs('error')(),
      winston.format.timestamp(),
      // customFormat,
      myCustomFormat,
    ),
  }),
  new winston.transports.DailyRotateFile({
    filename: 'logs/warn/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '128m',
    maxFiles: '14d',
    level: 'warn',
    json: true,
    format: winston.format.combine(
      filterLevelLogs('warn')(),
      winston.format.timestamp(),
      // customFormat,
      myCustomFormat,
    ),
  }),
  new winston.transports.DailyRotateFile({
    filename: 'logs/info/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '128m',
    maxFiles: '14d',
    json: true,
    level: 'info',
    format: winston.format.combine(
      filterLevelLogs('info')(),
      winston.format.timestamp(),
      // customFormat,
      myCustomFormat,
    ),
  }),
];

if (process.env.NODE_ENV !== 'production') {
  transports.push(
    new winston.transports.Console({
      level: process.env.NODE_ENV !== 'production' ? 'debug' : 'warn', // log warn level to console only
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
  );
}

const logger = winston.createLogger({
  transports: transports,
  exceptionHandlers: exceptionHandlers,
  level: process.env.NODE_ENV !== 'production' ? 'debug' : 'warn', // log warn level to console only
  exitOnError: false,
  format: winston.format.combine(
    winston.format.errors({ stack: true }), // Include error stack traces
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf((info) => {
      // Check if there is a stack available (it's an error) and format accordingly
      // Also serialize and include all additional arguments
      return `${info.timestamp} ${info.level}: ${info.message}${
        info.stack ? '\n' + info.stack : ''
      } ${serializeArgs(info)}`;
    }),
  ),
});

export default logger;
