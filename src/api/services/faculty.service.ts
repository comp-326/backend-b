/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ExpressError } from '@comp326-common/errors/ExpressError';
import FDO from '@comp326-api/dao/Faculty.dao';
import { FacultyDto } from '@comp326-api/dtos/Faculty.dto';
import { IFaculty } from '@comp326-schema/Faculty.schema';
import validateMongodbId from '@comp326-helpers/validators/validateMongoId';

class FacultyService {
	private _facultyDao = FDO;

	protected get facultyDao() {
		return this._facultyDao;
	}

	createFaculty = async (faculty: IFaculty) => {
		const newFaculty = new FacultyDto(faculty.name, faculty.dean).toJSon();
		const res = await this.facultyDao.createFaculty(newFaculty);

		return res;
	};

	updateFaculty = async (id: string, faculty: Partial<IFaculty>) => {
		const existingFaculty = await this.facultyDao.findFacultyById(id);
		const update = { ...existingFaculty!, ...faculty };
		const res = await this.facultyDao.updateFaculty(
			id,
			new FacultyDto(update.name, update.dean).toJSon(),
		);

		return res;
	};

	deleteFaculty = async (id: string) => {
		const response = await this.facultyDao.deleteFaculty(id);

		return response;
	};

	getFacultyByReg = async (reg: string) => {
		const response = await this.facultyDao.findFacultyByReg(reg);

		return response;
	};

	getFacultyById = async (id: string) => {
		if (!validateMongodbId(id)) {
			throw new ExpressError({
				statusCode: 400,
				message: 'Invalid faculty id',
				status: 'warning',
				data: {},
			});
		}
		const response = await this.facultyDao.findFacultyById(id);

		return response;
	};

	searchFaculty = async (query: string) => {
		const res = await this.facultyDao.searchFaculty(query);

		return res;
	};

	getFacultys = async (limit: number, page: number) => {
		return await this.facultyDao.getAllFacultys(limit, page);
	};
}

export default new FacultyService();
