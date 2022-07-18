/* eslint-disable @typescript-eslint/no-non-null-assertion */
import CDO from '@comp326-api/dao/Course.dao';
import { ExpressError } from '@comp326-common/errors/ExpressError';
import { IStudent } from '@comp326-schema/Student.schema';
import SDO from '@comp326-api/dao/Student.dao';
import { StudentDto } from '@comp326-api/dtos/Student.dto';
import { createStudentRegistrationNumber } from '@comp326-helpers/reg-generator/regGenerator';
import validateMongodbId from '@comp326-helpers/validators/validateMongoId';

class StudentService {
	private _studentDao = SDO;

	private _courseDao = CDO;

	protected get studentDao() {
		return this._studentDao;
	}

	protected get courseDao() {
		return this._courseDao;
	}

	createStudent = async (student: IStudent) => {
		const course = await this.courseDao.findCourseById(student.course);
		if (!course) {
			throw new ExpressError({
				data: {},
				message: 'Course not found',
				status: 'error',
				statusCode: 400,
			});
		}
		const data = await createStudentRegistrationNumber(course.code);
		student.regNo = data.regNumber;
		student.password = data.password;
		const newStudent = new StudentDto(
			student
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
				update
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
