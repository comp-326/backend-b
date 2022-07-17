/* eslint-disable @typescript-eslint/no-non-null-assertion */
import CDO from '@comp326-api/dao/Course.dao';
import { CourseDto } from '@comp326-api/dtos/Course.dto';
import { ExpressError } from '@comp326-common/errors/ExpressError';
import { ICourse } from '@comp326-schema/Course.schema';
import validateMongodbId from '@comp326-helpers/validators/validateMongoId';

class CourseService {
	private _courseDao = CDO;

	protected get courseDao() {
		return this._courseDao;
	}

	createCourse = async (course: ICourse) => {
		const newCourse = new CourseDto(
			course.name,
			course.code,
			course.department,
		).toJSon();
		const res = await this.courseDao.createCourse(newCourse);

		return res;
	};

	updateCourse = async (id: string, course: Partial<ICourse>) => {
		const existingCourse = await this.courseDao.findCourseById(id);
		const update = { ...existingCourse!, ...course };
		const res = await this.courseDao.updateCourse(
			id,
			new CourseDto(update.name, update.code, update.department).toJSon(),
		);

		return res;
	};

	deleteCourse = async (id: string) => {
		const response = await this.courseDao.deleteCourse(id);

		return response;
	};

	getCourseByReg = async (reg: string) => {
		const response = await this.courseDao.findCourseByReg(reg);

		return response;
	};

	getCourseById = async (id: string) => {
		if (!validateMongodbId(id)) {
			throw new ExpressError({
				statusCode: 400,
				message: 'Invalid course id',
				status: 'warning',
				data: {},
			});
		}
		const response = await this.courseDao.findCourseById(id);

		return response;
	};

	searchCourse = async (query: string) => {
		const res = await this.courseDao.searchCourse(query);

		return res;
	};

	getCourses = async (limit: number, page: number) => {
		return await this.courseDao.getAllCourses(limit, page);
	};
}

export default new CourseService();
