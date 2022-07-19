import { BaseRouter } from '@comp326-common/routes/baseRouter';
import { loginRequired } from '@comp326-middlewares/auth';
import sessionUnitController from '@comp326-api/controllers/sessionUnit.controller';

class SessionUnitRouter extends BaseRouter {
	route() {
		this.router.post('/', loginRequired, sessionUnitController.createSessionUnit);
		this.router.get('/', loginRequired, sessionUnitController.getSessionUnits);
		this.router.get('/find/:reg', loginRequired, sessionUnitController.getSessionUnitByReg);
		this.router.get('/:id', loginRequired, sessionUnitController.getSessionUnitById);
		this.router.get('/q', loginRequired, sessionUnitController.searchSessionUnit);

		return this.router;
	}
}

export default new SessionUnitRouter().route();
