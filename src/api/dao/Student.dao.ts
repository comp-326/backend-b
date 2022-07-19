import { ExpressError } from '@comp326-common/errors/ExpressError';
import Student, { IStudent } from '@comp326-schema/Student.schema';

class StudentDao {
	getAllStudents = async (limit: number, page: number) => {
		const students = await Student.find()
			.skip(limit * (page - 1))
			.limit(limit)
			.populate('course')
			.populate('course.department')
			.populate('currentSession');

		return students;
	};

	createStudent = async (student: IStudent) => {
		const existingStudent = await Student.findOne({
			$or: [{ nationalId: student.nationalId }, { email: student.email }, { regNo: student.regNo },],
		});
		if (existingStudent) {
			throw new ExpressError({
				status: 'warning',
				data: {},
				statusCode: 400,
				message: 'Student already exists',
			});
		}
		const newStudent = await Student.create(
			student
		);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password: _, ...props } = newStudent._doc;

		return props;
	};

	updateStudent = async (id: string, student: IStudent) => {
		const updated = await Student.findByIdAndUpdate(id, { ...student });

		return updated;
	};

	deleteStudent = async (id: string) => {
		await Student.findByIdAndUpdate(id, { $set: { deleted: true } });

		return true;
	};

	searchStudent = async (query: string) => {
		return await Student.find({ query });
	};


	findStudentById = async (id: string) => {
		return await Student.findById(id);
	};

	findStudentByReg = async (reg: string) => {
		return await Student.findOne({ reg });
	};
}

export default new StudentDao();
