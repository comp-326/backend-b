import Student, { IStudent } from '@comp326-schema/Student.schema';

class StudentDao {
	getAllStudents = async (limit: number, page: number) => {
		const students = await Student.find()
			.skip(limit * (page - 1))
			.limit(limit);

		return students;
	};

	createStudent = async (student: IStudent) => {
		const newStudent = await Student.create(student);

		return newStudent;
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
