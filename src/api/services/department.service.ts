/* eslint-disable @typescript-eslint/no-non-null-assertion */
import DDO from '@comp326-api/dao/Department.dao';
import { DepartmentDto } from '@comp326-api/dtos/Department.dto';
import { ExpressError } from '@comp326-common/errors/ExpressError';
import { IDepartment } from '@comp326-schema/Department.schema';
import validateMongodbId from '@comp326-helpers/validators/validateMongoId';

class DepartmentService {
	private _departmentDao = DDO;

	protected get departmentDao() {
		return this._departmentDao;
	}

	createDepartment = async (department: IDepartment) => {
		const newDepartment = new DepartmentDto(
			department.name,
			department.cod,
			department.faculty,
		).toJSon();
		const res = await this.departmentDao.createDepartment(newDepartment);

		return res;
	};

	updateDepartment = async (id: string, department: Partial<IDepartment>) => {
		const existingDepartment = await this.departmentDao.findDepartmentById(id);
		const update = { ...existingDepartment!, ...department };
		const res = await this.departmentDao.updateDepartment(
			id,
			new DepartmentDto(update.name, update.cod, update.faculty).toJSon(),
		);

		return res;
	};

	deleteDepartment = async (id: string) => {
		const response = await this.departmentDao.deleteDepartment(id);

		return response;
	};

	getDepartmentByReg = async (reg: string) => {
		const response = await this.departmentDao.findDepartmentByReg(reg);

		return response;
	};

	getDepartmentById = async (id: string) => {
		if (!validateMongodbId(id)) {
			throw new ExpressError({
				statusCode: 400,
				message: 'Invalid department id',
				status: 'warning',
				data: {},
			});
		}
		const response = await this.departmentDao.findDepartmentById(id);

		return response;
	};

	searchDepartment = async (query: string) => {
		const res = await this.departmentDao.searchDepartment(query);

		return res;
	};

	getDepartments = async (limit: number, page: number) => {
		return await this.departmentDao.getAllDepartments(limit, page);
	};
}

export default new DepartmentService();
