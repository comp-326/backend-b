import { BaseRouter } from '@comp326-common/routes/baseRouter';
import departmentController from '@comp326-api/controllers/department.controller';

class DepartmentRouter extends BaseRouter {
	route() {
		this.router.post('/', departmentController.createDepartment);
		this.router.get('/', departmentController.getDepartments);
		this.router.get('/find/:reg', departmentController.getDepartmentByReg);
		this.router.get('/:id', departmentController.getDepartmentById);
		this.router.get('/q', departmentController.searchDepartment);

		return this.router;
	}
}

export default new DepartmentRouter().route();
