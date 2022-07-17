import { ExpressError } from '@comp326-common/errors/ExpressError';
import SessionUnit, { ISessionUnit } from '@comp326-schema/SessionUnit.schema';

class SessionUnitDao {
	getAllSessionUnits = async (limit: number, page: number) => {
		const sessionUnits = await SessionUnit.find()
			.skip(limit * (page - 1))
			.limit(limit)
			.populate('course');

		return sessionUnits;
	};

	createSessionUnit = async (sessionUnit: ISessionUnit) => {
		const existingSessionUnit = await SessionUnit.findOne({
			course: sessionUnit.course,
			code: sessionUnit.code,
		});
		if (existingSessionUnit) {
			throw new ExpressError({
				message: 'SessionUnit already exists',
				statusCode: 400,
				status: 'warning',
				data: {},
			});
		}
		const newSessionUnit = await SessionUnit.create(sessionUnit);

		return newSessionUnit;
	};

	updateSessionUnit = async (id: string, sessionUnit: ISessionUnit) => {
		const updated = await SessionUnit.findByIdAndUpdate(id, {
			...sessionUnit,
		});

		return updated;
	};

	deleteSessionUnit = async (id: string) => {
		await SessionUnit.findByIdAndUpdate(id, { $set: { deleted: true } });

		return true;
	};

	searchSessionUnit = async (query: string) => {
		return await SessionUnit.find({ query });
	};

	findSessionUnitById = async (id: string) => {
		return await SessionUnit.findById(id);
	};

	findSessionUnitByReg = async (reg: string) => {
		return await SessionUnit.findOne({ reg });
	};
}

export default new SessionUnitDao();
