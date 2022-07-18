import { BaseRouter } from '@comp326-common/routes/baseRouter';
import unitController from '@comp326-api/controllers/unit.controller';

class UnitRouter extends BaseRouter {
	route() {
		this.router.post('/', unitController.createUnit);
		this.router.get('/', unitController.getUnits);
		this.router.get('/find/:reg', unitController.getUnitByReg);
		this.router.get('/:id', unitController.getUnitById);
		this.router.get('/q', unitController.searchUnit);

		return this.router;
	}
}

export default new UnitRouter().route();
