import { BaseRouter } from '@comp326-common/routes/baseRouter';
import studentController from '@comp326-api/controllers/student.controller';

class StudentRouter extends BaseRouter {
	route() {
		this.router.post('/', studentController.createStudent);
		this.router.get('/', studentController.getStudents);
		this.router.get('/find/:reg', studentController.getStudentByReg);
		this.router.get('/:id', studentController.getStudentById);
		this.router.get('/q', studentController.searchStudent);

		return this.router;
	}
}

export default new StudentRouter().route();
