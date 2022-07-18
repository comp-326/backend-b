import DepartmentModel from '@comp326-schema/Department.schema';
import { ExpressError } from '@comp326-common/errors/ExpressError';
import Lecturer, { ILecturer } from '@comp326-schema/Lecturer.schema';

class LecturerDao {
	getAllLecturers = async (limit: number, page: number) => {
		const lecturers = await Lecturer.find()
			.skip(limit * (page - 1))
			.limit(limit)
			.populate('units');

		return lecturers;
	};

	createLecturer = async (lecturer: ILecturer) => {
		const existingLecturer = await Lecturer.findOne({
			$or: [
				{ email: lecturer.email },
				{ nationalId: lecturer.nationalId },
				{ staffId: lecturer.staffId },
			]
		});
		if (existingLecturer) {
			throw new ExpressError({
				message: 'Lecturer already exists',
				statusCode: 400,
				status: 'warning',
				data: {},
			});
		}
		const existingDepartment = await DepartmentModel.findById(
			lecturer.department,
		);
		if (!existingDepartment) {
			throw new ExpressError({
				message: 'Department does not exist',
				statusCode: 400,
				status: 'warning',
				data: {},
			});
		}
		const newLecturer = await Lecturer.create(lecturer);

		return newLecturer;
	};

	updateLecturer = async (id: string, lecturer: ILecturer) => {
		const updated = await Lecturer.findByIdAndUpdate(id, { ...lecturer });

		return updated;
	};

	deleteLecturer = async (id: string) => {
		await Lecturer.findByIdAndUpdate(id, { $set: { deleted: true } });

		return true;
	};

	searchLecturer = async (query: string) => {
		return await Lecturer.find({
			$text: { $search: query },
			score: { $meta: 'textScore' },
		});
	};

	findLecturerById = async (id: string) => {
		return await Lecturer.findById(id);
	};

	findLecturerByReg = async (reg: string) => {
		return await Lecturer.findOne({ reg });
	};
}

export default new LecturerDao();
