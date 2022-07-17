import { BaseRouter } from '@comp326-common/routes/baseRouter';
import sessionUnitController from '@comp326-api/controllers/sessionUnit.controller';

class SessionUnitRouter extends BaseRouter {
	route() {
		this.router.post('/', sessionUnitController.createSessionUnit);
		this.router.get('/', sessionUnitController.getSessionUnits);
		this.router.get('/find/:reg', sessionUnitController.getSessionUnitByReg);
		this.router.get('/:id', sessionUnitController.getSessionUnitById);
		this.router.get('/q', sessionUnitController.searchSessionUnit);

		return this.router;
	}
}

export default new SessionUnitRouter().route();
