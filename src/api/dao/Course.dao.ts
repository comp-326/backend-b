import Course, { ICourse } from '@comp326-schema/Course.schema';

class CourseDao {
	getAllCourses = async (limit: number, page: number) => {
		const courses = await Course.find()
			.skip(limit * (page - 1))
			.limit(limit);

		return courses;
	};

	createCourse = async (course: ICourse) => {
		const newCourse = await Course.create(course);

		return newCourse;
	};

	updateCourse = async (id: string, course: ICourse) => {
		const updated = await Course.findByIdAndUpdate(id, { ...course });

		return updated;
	};

	deleteCourse = async (id: string) => {
		await Course.findByIdAndUpdate(id, { $set: { deleted: true } });

		return true;
	};

	searchCourse = async (query: string) => {
		return await Course.find({ query });
	};

	findCourseById = async (id: string) => {
		return await Course.findById(id);
	};

	findCourseByReg = async (reg: string) => {
		return await Course.findOne({ reg });
	};
}

export default new CourseDao();
