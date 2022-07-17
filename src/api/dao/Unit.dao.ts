import { ExpressError } from '@comp326-common/errors/ExpressError';
import Unit, { IUnit } from '@comp326-schema/Unit.schema';

class UnitDao {
	getAllUnits = async (limit: number, page: number) => {
		const units = await Unit.find()
			.skip(limit * (page - 1))
			.limit(limit);

		return units;
	};

	createUnit = async (unit: IUnit) => {
		const existingUnit = await Unit.findOne({
			name: unit.name,
			code: unit.code,
		});
		if (existingUnit) {
			throw new ExpressError({
				message: 'Unit already exists',
				statusCode: 400,
				status: 'warning',
				data: {},
			});
		}
		const newUnit = await Unit.create(unit);

		return newUnit;
	};

	updateUnit = async (id: string, unit: IUnit) => {
		const updated = await Unit.findByIdAndUpdate(id, { ...unit });

		return updated;
	};

	deleteUnit = async (id: string) => {
		await Unit.findByIdAndUpdate(id, { $set: { deleted: true } });

		return true;
	};

	searchUnit = async (query: string) => {
		return await Unit.find({ query });
	};

	findUnitById = async (id: string) => {
		return await Unit.findById(id);
	};

	findUnitByReg = async (reg: string) => {
		return await Unit.findOne({ reg });
	};
}

export default new UnitDao();
