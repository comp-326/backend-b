import { BaseRouter } from '@comp326-common/routes/baseRouter';
import lecturerController from '@comp326-api/controllers/lecturer.controller';

class LecturerRouter extends BaseRouter {
	route() {
		this.router.post('/', lecturerController.createLecturer);
		this.router.get('/', lecturerController.getLecturers);
		this.router.get('/find/:reg', lecturerController.getLecturerByReg);
		this.router.get('/q', lecturerController.searchLecturer);
		this.router.get('/:id', lecturerController.getLecturerById);

		return this.router;
	}
}

export default new LecturerRouter().route();
