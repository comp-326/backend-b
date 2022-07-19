import { BaseRouter } from '@comp326-common/routes/baseRouter';
import studentController from '@comp326-api/controllers/student.controller';

class StudentRouter extends BaseRouter {
	route() {
		this.router.post('/', loginRequired, studentController.createStudent);
		this.router.get('/', loginRequired, studentController.getStudents);
		this.router.get('/find/:reg', loginRequired, studentController.getStudentByReg);
		this.router.get('/:id', loginRequired, studentController.getStudentById);
		this.router.get('/q', loginRequired, studentController.searchStudent);

		return this.router;
	}
}

export default new StudentRouter().route();
