import { BaseRouter } from '@comp326-common/routes/baseRouter';
import courseController from '@comp326-api/controllers/course.controller';

class CourseRouter extends BaseRouter {
	route() {
		this.router.post('/', courseController.createCourse);
		this.router.get('/', courseController.getCourses);
		this.router.get('/find/:reg', courseController.getCourseByReg);
		this.router.get('/:id', courseController.getCourseById);
		this.router.get('/q', courseController.searchCourse);

		return this.router;
	}
}

export default new CourseRouter().route();
