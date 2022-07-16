/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';

export interface IReq extends Request {
	[props: string]: any;
}

export interface IRes extends Response {
	[props: string]: any;
}

export interface INext extends NextFunction {
	[props: string]: any;
}
