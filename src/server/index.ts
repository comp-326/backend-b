import { createServer } from 'http';
// eslint-disable-next-line sort-imports
import { App } from '@comp326-app';
import chalk from 'chalk';
import moment from 'moment';
import { processLogger } from '@comp326-logger';

class AppServer {
	private __server: ReturnType<typeof createServer>;

	private __appName: string;

	constructor() {
		const app = new App();
		this.__appName = app.appName();
		this.__server = createServer(app.app());
	}

	protected server = () => this.__server;

	private np = () => {
		process.on('uncaughtException', (err, p) => {
			processLogger.warn(
				JSON.stringify({
					reason: err.message,
					p,
				}),
			);
		});
		process.on('unhandledRejection', (reason, promise) => {
			const msg = JSON.stringify({
				reason,
				promise,
			});
			processLogger.warn(msg);
		});
		process.on('SIGINT', () => {
			processLogger.warn('CTRL + C Stopping node service');
			process.exit(0);
		});
	};

	start(port: number) {
		this.np();
		const message = JSON.stringify({
			appName: this.__appName,
			port: port,
			message: 'Server started',
			version: 'v1',
			date: moment().format('LL'),
		});
		this.server().listen(port, () => {
			console.info(
				chalk.yellow(`Server starter on ${moment().format('LLLL')}\n`),
				message,
			);
		});
	}
}

export default AppServer;
