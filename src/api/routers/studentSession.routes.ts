import { BaseRouter } from '@comp326-common/routes/baseRouter';
import studentSessionController from '@comp326-api/controllers/studentSession.controller';
import { loginRequired } from '@comp326-middlewares/auth';

class StudentSessionRouter extends BaseRouter {
	route() {
		this.router.post('/', loginRequired,studentSessionController.createStudentSession);
		this.router.get('/', loginRequired,studentSessionController.getStudentSessions);
		this.router.get('/l/students/:unit', loginRequired,studentSessionController.getLecturerUnitRegisteredStudents);
		this.router.post('/l/students/r/:session', loginRequired,studentSessionController.submitSessionResult);
		this.router.get('/:id', loginRequired,studentSessionController.getStudentSessionById);
		this.router.get('/q', loginRequired,studentSessionController.searchStudentSession);

		return this.router;
	}
}

export default new StudentSessionRouter().route();
