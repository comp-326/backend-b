import { BaseRouter } from '@comp326-common/routes/baseRouter';
import facultyController from '@comp326-api/controllers/faculty.controller';

class FacultyRouter extends BaseRouter {
	route() {
		this.router.post('/', facultyController.createFaculty);
		this.router.get('/', facultyController.getFacultys);
		this.router.get('/find/:reg', facultyController.getFacultyByReg);
		this.router.get('/:id', facultyController.getFacultyById);
		this.router.get('/q', facultyController.searchFaculty);

		return this.router;
	}
}

export default new FacultyRouter().route();
