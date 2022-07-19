/* eslint-disable @typescript-eslint/no-non-null-assertion */
import CDO from '@comp326-api/dao/Course.dao';
import { ExpressError } from '@comp326-common/errors/ExpressError';
import { IStudent } from '@comp326-schema/Student.schema';
import { Password } from '@comp326-helpers/password';
import SDO from '@comp326-api/dao/Student.dao';
import { createStudentRegistrationNumber } from '@comp326-helpers/reg-generator/regGenerator';
import { studentDTO } from '@comp326-api/dtos/Student.dto';
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
		if (!validateMongodbId(student.course)) {
			throw new ExpressError({
				data: {},
				message: 'Invalid course id',
				status: 'error',
				statusCode: 400,
			});
		}
		const course = await this.courseDao.findCourseById(student.course);
		if (!course) {
			throw new ExpressError({
				data: {},
				message: 'Course not found',
				status: 'error',
				statusCode: 400,
			});
		}
		const reg = await createStudentRegistrationNumber(course.code);
		student.regNo = reg;
		student.password = await Password.hash(reg);
		const ns = studentDTO(student);
		const res = await this.studentDao.createStudent({
			course: ns.getCourse(),
			currentSession: ns.getCurrentSession(),
			dateOfBirth: ns.getDateOfBirth(),
			email: ns.getEmail(),
			firstName: ns.getFirstName(),
			hudumaNumber: ns.getHudumaNumber(),
			lastName: ns.getLastName(),
			nationalId: ns.getNationalId(),
			phone: ns.getPhone(),
			regNo: ns.getRegNo(),
			password: ns.getPassword(),
		});

		return res;
	};

	updateStudent = async (id: string, student: Partial<IStudent>) => {
		const existingStudent = await this.studentDao.findStudentById(id);
		const us = studentDTO({ ...existingStudent!, ...student });
		const res = await this.studentDao.updateStudent(
			id,
			{
				course: us.getCourse(),
				currentSession: us.getCurrentSession(),
				dateOfBirth: us.getDateOfBirth(),
				email: us.getEmail(),
				firstName: us.getFirstName(),
				hudumaNumber: us.getHudumaNumber(),
				lastName: us.getLastName(),
				nationalId: us.getNationalId(),
				phone: us.getPhone(),
				regNo: us.getRegNo(),
				password: us.getPassword(),
			},
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
