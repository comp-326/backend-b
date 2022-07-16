import Api from '@comp326-api';
import ErrorHandler from '@comp326-common/errors/ErrorHandler';
import express from 'express';
import logger from 'morgan';
import { requestErrorLogger, requestLogger } from '@comp326-logger';

export class PluginMiddlewareLoader {
	private app: express.Application;

	private _appVersion = 1;

	constructor({
		app,
		version,
	}: {
		app: express.Application;
		version: number;
	}) {
		this.app = app;
		this._appVersion = version;
	}

	version = () => this._appVersion;

	loadPlugins = () => {
		this.app.use(logger('dev'));
		this.app.use(express.json({ limit: '200mb' }));
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(requestLogger);
		this.app.use(`/api/v${this.version()}`, Api.router());
		this.app.use(requestErrorLogger);
		this.app.use(ErrorHandler);
	};
}
