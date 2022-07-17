import { ExpressError } from '@comp326-common/errors/ExpressError';
import FacultyModel from '@comp326-schema/Faculty.schema';
import Department, { IDepartment } from '@comp326-schema/Department.schema';

class DepartmentDao {
	getAllDepartments = async (limit: number, page: number) => {
		const departments = await Department.find()
			.skip(limit * (page - 1))
			.limit(limit);

		return departments;
	};

	createDepartment = async (department: IDepartment) => {
		const existingDepartment = await Department.findOne({
			$or: [{ name: department.name }],
		});
		if (existingDepartment) {
			throw new ExpressError({
				message: 'Department already exists',
				statusCode: 400,
				status: 'warning',
				data: {},
			});
		}
		const existingFaculty = await FacultyModel.findById(department.faculty);
		if (!existingFaculty) {
			throw new ExpressError({
				message: 'Faculty does not exist',
				statusCode: 400,
				status: 'warning',
				data: {},
			});
		}
		const newDepartment = await Department.create(department);

		return newDepartment;
	};

	updateDepartment = async (id: string, department: IDepartment) => {
		const updated = await Department.findByIdAndUpdate(id, {
			...department,
		});

		return updated;
	};

	deleteDepartment = async (id: string) => {
		await Department.findByIdAndUpdate(id, { $set: { deleted: true } });

		return true;
	};

	searchDepartment = async (query: string) => {
		return await Department.find({ query });
	};

	findDepartmentById = async (id: string) => {
		return await Department.findById(id);
	};

	findDepartmentByReg = async (reg: string) => {
		return await Department.findOne({ reg });
	};
}

export default new DepartmentDao();
