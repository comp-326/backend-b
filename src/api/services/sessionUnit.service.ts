/* eslint-disable @typescript-eslint/no-non-null-assertion */
import CourseDao from '@comp326-api/dao/Course.dao';
import { ExpressError } from '@comp326-common/errors/ExpressError';
import { ISessionUnit } from '@comp326-schema/SessionUnit.schema';
import SDO from '@comp326-api/dao/SessionUnit.dao';
import { SessionUnitDto } from '@comp326-api/dtos/SessionUnit.dto';
import { generateSessionUnitCode as gCode } from '@comp326-helpers/reg-generator/regGenerator';
import validateMongodbId from '@comp326-helpers/validators/validateMongoId';

class SessionUnitService {
	private _sessionUnitDao = SDO;

	private _courseUnitDao = CourseDao;

	protected get sessionUnitDao() {
		return this._sessionUnitDao;
	}

	protected get courseUnitDao() {
		return this._courseUnitDao;
	}

	createSessionUnit = async (sessionUnit: ISessionUnit) => {
		const course = await this.courseUnitDao.findCourseById(
			sessionUnit.course,
		);
		if (!course) {
			throw new ExpressError({
				statusCode: 400,
				message: 'Course not found',
				status: 'error',
				data: {},
			});
		}
		sessionUnit.code = gCode(
			sessionUnit.sessionYear,
			sessionUnit.sessionSemester,
			course.code,
		);
		const newSessionUnit = new SessionUnitDto(
			sessionUnit.sessionYear,
			sessionUnit.sessionSemester,
			sessionUnit.year,
			sessionUnit.units,
			sessionUnit.course,
			sessionUnit.code,
		).toJSon();
		const res = await this.sessionUnitDao.createSessionUnit(newSessionUnit);

		return res;
	};

	updateSessionUnit = async (
		id: string,
		sessionUnit: Partial<ISessionUnit>,
	) => {
		const existingSessionUnit =
			await this.sessionUnitDao.findSessionUnitById(id);
		const update = { ...existingSessionUnit!, ...sessionUnit };
		const res = await this.sessionUnitDao.updateSessionUnit(
			id,
			new SessionUnitDto(
				update.sessionYear,
				update.sessionSemester,
				update.sessionYear,
				update.units,
				update.course,
				update.code,
			).toJSon(),
		);

		return res;
	};

	deleteSessionUnit = async (id: string) => {
		const response = await this.sessionUnitDao.deleteSessionUnit(id);

		return response;
	};

	getSessionUnitByReg = async (reg: string) => {
		const response = await this.sessionUnitDao.findSessionUnitByReg(reg);

		return response;
	};

	getSessionUnitById = async (id: string) => {
		if (!validateMongodbId(id)) {
			throw new ExpressError({
				statusCode: 400,
				message: 'Invalid sessionUnit id',
				status: 'warning',
				data: {},
			});
		}
		const response = await this.sessionUnitDao.findSessionUnitById(id);

		return response;
	};

	searchSessionUnit = async (query: string) => {
		const res = await this.sessionUnitDao.searchSessionUnit(query);

		return res;
	};

	getSessionUnits = async (limit: number, page: number) => {
		return await this.sessionUnitDao.getAllSessionUnits(limit, page);
	};
}

export default new SessionUnitService();
