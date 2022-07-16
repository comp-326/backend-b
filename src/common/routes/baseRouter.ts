import { Router } from 'express';

export class BaseRouter{
	public router = Router();

	route():Router{
       
		return this.router;
	}
}