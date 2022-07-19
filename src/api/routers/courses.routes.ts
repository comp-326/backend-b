import { BaseRouter } from '@comp326-common/routes/baseRouter';
import courseController from '@comp326-api/controllers/course.controller';
import { loginRequired } from '@comp326-middlewares/auth';

class CourseRouter extends BaseRouter {
	route() {
		this.router.post('/', loginRequired, courseController.createCourse);
		this.router.get('/', loginRequired, courseController.getCourses);
		this.router.get('/find/:reg', loginRequired, courseController.getCourseByReg);
		this.router.get('/:id', loginRequired, courseController.getCourseById);
		this.router.get('/q', loginRequired, courseController.searchCourse);

		return this.router;
	}
}

export default new CourseRouter().route();
