import DepartmentModel from '@comp326-schema/Department.schema';
import { ExpressError } from '@comp326-common/errors/ExpressError';
import Unit, { IUnit } from '@comp326-schema/Unit.schema';

class UnitDao {
	getAllUnits = async (limit: number, page: number) => {
		const units = await Unit.find()
			.skip(limit * (page - 1))
			.limit(limit);

		return units;
	};

	getUnitsByDepartment = async (
		department: string,
		year: number,
		semester: number,
	) => {
		const units = await Unit.find({
			department: department,
			year: year,
			semester: semester,
		});
		const unitIds = units.map((unit) => unit._id);

		return { units, unitIds };
	};

	createUnit = async (unit: IUnit) => {
		const existingUnit = await Unit.findOne({
			$or: [{ code: unit.code }, { name: unit.name }],
		});

		if (existingUnit) {
			throw new ExpressError({
				message: 'Unit already exists',
				statusCode: 400,
				status: 'warning',
				data: {},
			});
		}
		const existingDepartment = await DepartmentModel.findById(
			unit.department,
		);
		if (!existingDepartment) {
			throw new ExpressError({
				message: 'Department does not exist',
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
