import { BaseRouter } from '@comp326-common/routes/baseRouter';
import studentSessionController from '@comp326-api/controllers/studentSession.controller';

class StudentSessionRouter extends BaseRouter {
	route() {
		this.router.post('/', studentSessionController.createStudentSession);
		this.router.get('/', studentSessionController.getStudentSessions);
		this.router.get('/find/:reg', studentSessionController.getStudentSessionByReg);
		this.router.get('/:id', studentSessionController.getStudentSessionById);
		this.router.get('/q', studentSessionController.searchStudentSession);

		return this.router;
	}
}

export default new StudentSessionRouter().route();
