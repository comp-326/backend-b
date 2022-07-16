import { PluginMiddlewareLoader } from './../plugins/express';
import express from 'express';

class App {
	private _app: express.Application;

	private _appName: string;

	private _plugins: PluginMiddlewareLoader;

	private _apiVersion = 1;

	constructor() {
		this._appName = 'exam-cell-app';
		this._app = express();
		this.mountPlugins();
	}

	protected plugins = () => this._plugins;

	public app = () => this._app;

	public appName = () => this._appName;

	public apiVersion = () => this._apiVersion;

	private mountPlugins(): void {
		this._plugins = new PluginMiddlewareLoader({
			app: this.app(),
			version: this.apiVersion(),
		});
		this.plugins().loadPlugins();
	}
}

const app = new App().app();

export default app;
