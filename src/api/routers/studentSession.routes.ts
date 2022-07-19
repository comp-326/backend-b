import { BaseRouter } from '@comp326-common/routes/baseRouter';
import studentSessionController from '@comp326-api/controllers/studentSession.controller';

class StudentSessionRouter extends BaseRouter {
	route() {
		this.router.post('/', studentSessionController.createStudentSession);
		this.router.get('/', studentSessionController.getStudentSessions);
		this.router.get('/l/students/:unit', studentSessionController.getLecturerUnitRegisteredStudents);
		this.router.post('/l/students/r/:session', studentSessionController.submitSessionResult);
		this.router.get('/:id', studentSessionController.getStudentSessionById);
		this.router.get('/q', studentSessionController.searchStudentSession);

		return this.router;
	}
}

export default new StudentSessionRouter().route();
