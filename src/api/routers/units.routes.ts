import { BaseRouter } from '@comp326-common/routes/baseRouter';
import unitController from '@comp326-api/controllers/unit.controller';

class UnitRouter extends BaseRouter {
	route() {
		this.router.post('/', loginRequired,unitController.createUnit);
		this.router.get('/',loginRequired, unitController.getUnits);
		this.router.get('/department/:department',loginRequired, unitController.getDepartmentUnits);
		this.router.get('/find/:reg',loginRequired, unitController.getUnitByReg);
		this.router.get('/:id',loginRequired, unitController.getUnitById);
		this.router.get('/q',loginRequired, unitController.searchUnit);

		return this.router;
	}
}

export default new UnitRouter().route();
