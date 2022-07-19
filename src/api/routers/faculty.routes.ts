import { BaseRouter } from '@comp326-common/routes/baseRouter';
import facultyController from '@comp326-api/controllers/faculty.controller';
import { loginRequired } from '@comp326-middlewares/auth';

class FacultyRouter extends BaseRouter {
	route() {
		this.router.post('/', loginRequired,facultyController.createFaculty);
		this.router.get('/', loginRequired,facultyController.getFacultys);
		this.router.get('/find/:reg', loginRequired,facultyController.getFacultyByReg);
		this.router.get('/:id', loginRequired,facultyController.getFacultyById);
		this.router.get('/q', loginRequired,facultyController.searchFaculty);

		return this.router;
	}
}

export default new FacultyRouter().route();
