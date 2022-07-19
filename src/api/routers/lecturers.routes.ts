import { BaseRouter } from '@comp326-common/routes/baseRouter';
import lecturerController from '@comp326-api/controllers/lecturer.controller';

class LecturerRouter extends BaseRouter {
	route() {
		this.router.post('/',loginRequired, lecturerController.createLecturer);
		this.router.get('/', loginRequired,lecturerController.getLecturers);
		this.router.get('/find/:reg', loginRequired,lecturerController.getLecturerByReg);
		this.router.get('/q', loginRequired,lecturerController.searchLecturer);
		this.router.get('/:id', loginRequired,lecturerController.getLecturerById);

		return this.router;
	}
}

export default new LecturerRouter().route();
