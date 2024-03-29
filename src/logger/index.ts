import { baseDir } from '@comp326-config';
import expressWinston from 'express-winston';
import moment from 'moment';
import path from 'path';
import winston from 'winston';

export const requestLogger = expressWinston.logger({
	transports: [
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple(),
			),
		}),
		new winston.transports.File({
			filename: path.join(
				baseDir,
				`logs/request-logs/${moment().format(
					'YYYY-MM-DD',
				)}-request.log`,
			),
			level: 'info',
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.json(),
			),
		}),
		new winston.transports.Console(),
	],
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.json(),
	),
	meta: true, // optional: control whether you want to log the meta data about the request (default to true)
	msg: 'HTTP {{req.method}} {{req.url}} {{req.ip}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
	expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
	colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	ignoreRoute: function (req, res) {
		return false;
	}, // optional: allows to skip some log messages based on request and/or response
});

export const requestErrorLogger = expressWinston.errorLogger({
	transports: [
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple(),
			),
		}),
		new winston.transports.File({
			filename: path.join(
				baseDir,
				`logs/request-error-logs/${moment().format(
					'YYYY-MM-DD',
				)}-request-error.log`,
			),
			level: 'error',
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple(),
			),
		}),
	],
	meta: true,
});

export const dbLogger = winston.createLogger({
	transports: [
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple(),
			),
		}),
		new winston.transports.File({
			filename: path.join(
				baseDir,
				`logs/db-logs/${moment().format(
					'YYYY-MM-DD',
				)}-db.log`,
			),
			level: 'info',
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.json(),
			),
		}),
	],
	exitOnError: false,
});

export const socketLogger = winston.createLogger({
	transports: [
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple(),
			),
		}),
		new winston.transports.File({
			filename: path.join(
				baseDir,
				`logs/socket-logs/${moment().format(
					'YYYY-MM-DD',
				)}-socket.log`,
			),
			level: 'info',
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.json(),
			),
		}),
	],
	exitOnError: false,
});


export const processLogger = winston.createLogger({
	transports: [
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple(),
			),
		}),
		new winston.transports.File({
			filename: path.join(
				baseDir,
				`logs/process-logs/${moment().format(
					'YYYY-MM-DD',
				)}-process.log`,
			),
			level: 'info',
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.json(),
			),
		}),
	],
	exitOnError: false,
});

export const baseLogger = winston.createLogger({
	transports: [
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple(),
			),
		}),
		new winston.transports.File({
			filename: path.join(
				baseDir,
				`logs/base-logs/${moment().format(
					'YYYY-MM-DD',
				)}-base.log`,
			),
			level: 'info',
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.json(),
			),
		}),
	],
	exitOnError: false,
});