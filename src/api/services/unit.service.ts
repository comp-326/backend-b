/* eslint-disable @typescript-eslint/no-non-null-assertion */
import DDO from '@comp326-api/dao/Department.dao';
import { ExpressError } from '@comp326-common/errors/ExpressError';
import { IUnit } from '@comp326-schema/Unit.schema';
import UDO from '@comp326-api/dao/Unit.dao';
import { UnitDto } from '@comp326-api/dtos/Unit.dto';
import validateMongodbId from '@comp326-helpers/validators/validateMongoId';

class UnitService {
	private _unitDao = UDO;

	private _depDao = DDO;

	protected get unitDao() {
		return this._unitDao;
	}

	protected get depDao() {
		return this._depDao;
	}

	createUnit = async (unit: IUnit) => {
		const newUnit = new UnitDto(
			unit.name,
			unit.code,
			unit.department,
			unit.year,
			unit.semester,
		).toJSon();
		const res = await this.unitDao.createUnit(newUnit);

		return res;
	};

	updateUnit = async (id: string, unit: Partial<IUnit>) => {
		const existingUnit = await this.unitDao.findUnitById(id);
		const update = { ...existingUnit!, ...unit };
		const res = await this.unitDao.updateUnit(
			id,
			new UnitDto(
				update.name,
				update.code,
				update.department,
				update.year,
				update.semester,
			).toJSon(),
		);

		return res;
	};

	deleteUnit = async (id: string) => {
		const response = await this.unitDao.deleteUnit(id);

		return response;
	};

	getDepartmentCourses = async (
		department: string,
		year: number,
		semester: number,
	) => {
		const dep = await this.depDao.findDepartmentById(department);
		if (!dep) {
			throw new ExpressError({
				message: 'Department does not exist',
				statusCode: 404,
				status: 'warning',
				data: {}
			});
		}

		const response = await this.unitDao.getUnitsByDepartment(
			department,
			year,
			semester,
		);

		return response;
	};

	getUnitByReg = async (reg: string) => {
		const response = await this.unitDao.findUnitByReg(reg);

		return response;
	};

	getUnitById = async (id: string) => {
		if (!validateMongodbId(id)) {
			throw new ExpressError({
				statusCode: 400,
				message: 'Invalid unit id',
				status: 'warning',
				data: {},
			});
		}
		const response = await this.unitDao.findUnitById(id);

		return response;
	};

	searchUnit = async (query: string) => {
		const res = await this.unitDao.searchUnit(query);

		return res;
	};

	getUnits = async (limit: number, page: number) => {
		return await this.unitDao.getAllUnits(limit, page);
	};
}

export default new UnitService();
