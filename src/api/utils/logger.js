const { createLogger, format, transports } = require('winston');
const path = require('path');
require('winston-daily-rotate-file');

const options = (prefix) => ({
	level: 'debug',
	format: format.combine(
		format.label({ label: path.basename(prefix) }),
		format.colorize(),
		format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		format.printf((info) => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)
	),
	transports: [
		new transports.Console(),
		new transports.DailyRotateFile({
			filename: 'logs/%DATE%/combined.log',
			datePattern: 'DD-MMM-YYYY',
			level: 'debug',
			format: format.combine(format.uncolorize()),
		}),
		new transports.DailyRotateFile({
			filename: 'logs/%DATE%/errors.log',
			datePattern: 'DD-MMM-YYYY',
			level: 'error',
			format: format.combine(format.uncolorize()),
		}),
	],
});

// prettier-disable
const logger = (prefix) => createLogger(options(prefix));

module.exports = logger;
