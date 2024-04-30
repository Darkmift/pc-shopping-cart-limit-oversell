import logger from './logger'; // Adjust the import path as necessary
import fs from 'fs';
import winston from 'winston';

// Helper function to capture log outputs
const captureStream = (stream) => {
  const oldWrite = stream.write;
  let buf = '';
  stream.write = function (chunk, encoding, callback) {
    buf += chunk.toString(); // or whatever you want to do with it
    oldWrite.apply(stream, arguments);
  };

  return {
    unhook: () => (stream.write = oldWrite),
    captured: () => buf,
  };
};

describe('Logger functionality', () => {
  let hook;

  beforeEach(() => {
    // Clear log files or mock file writing
    jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    // Capture console output
    hook = captureStream(process.stdout);
  });

  afterEach(() => {
    hook.unhook();
    jest.restoreAllMocks();
  });

  test('logs info level messages correctly', (done) => {
    const testMessage = 'Test info message';
    const transport = new winston.transports.Stream({
      stream: process.stdout,
      format: winston.format.printf(info => info.message)
    });
    logger.add(transport);

    logger.info(testMessage);

    setImmediate(() => {
      const output = hook.captured();
      expect(output).toContain(testMessage);
      logger.remove(transport);
      done();
    });
  });

  test('logs warnings correctly', (done) => {
    const testMessage = 'Test warning message';
    const transport = new winston.transports.Stream({
      stream: process.stdout,
      format: winston.format.printf(info => info.message)
    });
    logger.add(transport);

    logger.warn(testMessage);

    setImmediate(() => {
      const output = hook.captured();
      expect(output).toContain(testMessage);
      logger.remove(transport);
      done();
    });
  });

  test('logs errors with stack trace correctly', (done) => {
    const testMessage = 'Test error message';
    const transport = new winston.transports.Stream({
      stream: process.stdout,
      format: winston.format.printf(info => info.message)
    });
    logger.add(transport);

    logger.error(testMessage);

    setImmediate(() => {
      const output = hook.captured();
      expect(output).toContain(testMessage);
      logger.remove(transport);
      done();
    });
  });
});