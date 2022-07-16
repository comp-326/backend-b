import { requestLogger } from '@comp326-logger';
import express from 'express';
import logger from 'morgan';
import Api from '../api';

export class PluginMiddlewareLoader {
	private app: express.Application;

	private _appVersion = 1;

	constructor({ app, version }: {
        app: express.Application,
        version: number
    }
	) {
		this.app = app;
		this._appVersion = version;
	}

	version = () => this._appVersion;

	loadPlugins = () => {
		this.app.use(logger('dev'));
		this.app.use(requestLogger);
		this.app.use(`/api/v${this.version()}`, Api.router());
	};
}

