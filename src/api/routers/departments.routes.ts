import { BaseRouter } from '@comp326-common/routes/baseRouter';
import departmentController from '@comp326-api/controllers/department.controller';
import { loginRequired } from '@comp326-middlewares/auth';

class DepartmentRouter extends BaseRouter {
	route() {
		this.router.post('/',loginRequired, departmentController.createDepartment);
		this.router.get('/',loginRequired, departmentController.getDepartments);
		this.router.get('/find/:reg',loginRequired, departmentController.getDepartmentByReg);
		this.router.get('/:id',loginRequired, departmentController.getDepartmentById);
		this.router.get('/q',loginRequired, departmentController.searchDepartment);

		return this.router;
	}
}

export default new DepartmentRouter().route();
