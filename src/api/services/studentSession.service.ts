/* eslint-disable @typescript-eslint/no-non-null-assertion */
import CDO from '@comp326-api/dao/StudentSession.dao';
import { ExpressError } from '@comp326-common/errors/ExpressError';
import { IStudentSession } from '@comp326-schema/StudentSession.schema';
import SDO from '@comp326-api/dao/Student.dao';
import { StudentSessionDto } from '@comp326-api/dtos/StudentSession.dto';
import validateMongodbId from '@comp326-helpers/validators/validateMongoId';

class StudentSessionService {
	private _studentSessionDao = CDO;

	private _studentDao = SDO;

	protected get studentSessionDao() {
		return this._studentSessionDao;
	}

	protected get studentDao() {
		return this._studentDao;
	}

	createStudentSession = async (studentSession: IStudentSession) => {
		const student = await this.studentDao.findStudentById(studentSession.student);
		if (!student) {
			throw new ExpressError({
				data: {},
				message: `Student ${studentSession.student} not found`,
				status: 'error',
				statusCode: 404,
			});
		}
		const newStudentSession = new StudentSessionDto(
			studentSession.student,
			studentSession.sessionYear,
			studentSession.sessionSemester,
			studentSession.year,
			studentSession.passed,
			studentSession.units,
			studentSession.results,
		).toJSon();
		const res = await this.studentSessionDao.createStudentSession(
			newStudentSession,
		);

		return res;
	};

	updateStudentSession = async (
		id: string,
		studentSession: Partial<IStudentSession>,
	) => {
		if (!validateMongodbId(id)) {
			throw new ExpressError({
				statusCode: 400,
				message: 'Invalid studentSession id',
				status: 'warning',
				data: {},
			});
		}
		const existingStudentSession =
			await this.studentSessionDao.findStudentSessionById(id);
		const update = { ...existingStudentSession!, ...studentSession };
		const res = await this.studentSessionDao.updateStudentSession(
			id,
			new StudentSessionDto(
				update.student,
				update.sessionYear,
				update.sessionSemester,
				update.year,
				update.passed,
				update.units,
				update.results,
			).toJSon(),
		);

		return res;
	};

	deleteStudentSession = async (id: string) => {
		const response = await this.studentSessionDao.deleteStudentSession(id);

		return response;
	};

	getLecturerUnitRegisteredStudents = async (unit: string, year: number, semester: number) => {
		const response = await this.studentSessionDao.getLecturerUnitRegisteredStudents(
			unit, year, semester,
		);

		return response;
	};

	getStudentSessionById = async (id: string) => {
		if (!validateMongodbId(id)) {
			throw new ExpressError({
				statusCode: 400,
				message: 'Invalid studentSession id',
				status: 'warning',
				data: {},
			});
		}
		const response = await this.studentSessionDao.findStudentSessionById(
			id,
		);

		return response;
	};

	searchStudentSession = async (query: string) => {
		const res = await this.studentSessionDao.searchStudentSession(query);

		return res;
	};

	getStudentSessions = async (limit: number, page: number) => {
		return await this.studentSessionDao.getAllStudentSessions(limit, page);
	};
}

export default new StudentSessionService();
