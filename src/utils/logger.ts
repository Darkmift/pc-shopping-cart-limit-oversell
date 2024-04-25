import winston from 'winston';

// Helper function to serialize additional log arguments
const serializeArgs = (info) => {
  // Extracts all arguments except the first (message)
  const args = info[Symbol.for('splat')];
  return args ? args.map(arg => JSON.stringify(arg, null, 2)).join(',') : '';
};

// Create a logger instance with enhanced error logging
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.errors({ stack: true }), // Include error stack traces
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf((info) => {
      // Check if there is a stack available (it's an error) and format accordingly
      // Also serialize and include all additional arguments
      return `${info.timestamp} ${info.level}: ${info.message}${info.stack ? '\n' + info.stack : ''} ${serializeArgs(info)}`;
    })
  ),
  transports: [
    // Transport for error logs
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    // Transport for warning logs
    new winston.transports.File({
      filename: 'logs/warning.log',
      level: 'warn',
    }),
    // Transport for info logs
    new winston.transports.File({
      filename: 'logs/info.log',
      level: 'info',
    }),
    // Console transport for output on the terminal
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.printf((info) => {
          // Check if there is a stack available (it's an error) and format accordingly
          // Also serialize and include all additional arguments
          return `${info.timestamp} ${info.level}: ${info.message}${info.stack ? '\n' + info.stack : ''} ${serializeArgs(info)}`;
        })
      ),
    }),
  ],
});

export default logger;
