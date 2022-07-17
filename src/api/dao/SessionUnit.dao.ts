import SessionUnit, { ISessionUnit } from '@comp326-schema/SessionUnit.schema';

class SessionUnitDao {
	getAllSessionUnits = async (limit: number, page: number) => {
		const sessionUnits = await SessionUnit.find()
			.skip(limit * (page - 1))
			.limit(limit);

		return sessionUnits;
	};

	createSessionUnit = async (sessionUnit: ISessionUnit) => {
		const newSessionUnit = await SessionUnit.create(sessionUnit);

		return newSessionUnit;
	};

	updateSessionUnit = async (id: string, sessionUnit: ISessionUnit) => {
		const updated = await SessionUnit.findByIdAndUpdate(id, { ...sessionUnit });

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
