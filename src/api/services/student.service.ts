/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ExpressError } from '@comp326-common/errors/ExpressError';
import { IStudent } from '@comp326-schema/Student.schema';
import SDO from '@comp326-api/dao/Student.dao';
import { StudentDto } from '@comp326-api/dtos/Student.dto';
import validateMongodbId from '@comp326-helpers/validators/validateMongoId';

class StudentService {
	private _studentDao = SDO;

	protected get studentDao() {
		return this._studentDao;
	}

	createStudent = async (student: IStudent) => {
		const newStudent = new StudentDto(
			student.firstName,
			student.lastName,
			student.dateOfBirth,
			student.regNo,
			student.course,
		).toJSon();
		const res = await this.studentDao.createStudent(newStudent);

		return res;
	};

	updateStudent = async (id: string, student: Partial<IStudent>) => {
		const existingStudent = await this.studentDao.findStudentById(id);
		const update = { ...existingStudent!, ...student };
		const res = await this.studentDao.updateStudent(
			id,
			new StudentDto(
				update.firstName,
				update.lastName,
				update.dateOfBirth,
				update.regNo,
				update.course,
			).toJSon(),
		);

		return res;
	};

	deleteStudent = async (id: string) => {
		const response = await this.studentDao.deleteStudent(id);

		return response;
	};

	getStudentByReg = async (reg: string) => {
		const response = await this.studentDao.findStudentByReg(reg);

		return response;
	};

	getStudentById = async (id: string) => {
		if (!validateMongodbId(id)) {
			throw new ExpressError({
				statusCode: 400,
				message: 'Invalid student id',
				status: 'warning',
				data: {},
			});
		}
		const response = await this.studentDao.findStudentById(id);

		return response;
	};

	searchStudent = async (query: string) => {
		const res = await this.studentDao.searchStudent(query);

		return res;
	};

	getStudents = async (limit: number, page: number) => {
		return await this.studentDao.getAllStudents(limit, page);
	};
}

export default new StudentService();
