/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ExpressError } from '@comp326-common/errors/ExpressError';
import { ILecturer } from '@comp326-schema/Lecturer.schema';
import LDO from '@comp326-api/dao/Lecturer.dao';
import { Password } from '@comp326-helpers/password';
import UDO from '@comp326-api/dao/Unit.dao';
import { lecturerDTO } from '@comp326-api/dtos/Lecturer.dto';
import { createStaffRegistrationNumber as reg } from '@comp326-helpers/reg-generator/regGenerator';
import validateMongodbId from '@comp326-helpers/validators/validateMongoId';

class LecturerService {
	private _lecturerDao = LDO;

	private _unitDao = UDO;

	protected get lecturerDao() {
		return this._lecturerDao;
	}

	protected get unitDao() {
		return this._unitDao;
	}

	createLecturer = async (lecturer: ILecturer) => {

		const data = reg();
		lecturer.staffId = data;
		lecturer.password = await Password.hash(data);
		const nl = lecturerDTO({
			...lecturer,
		});
		const units = nl.getUnits();

		// loop trhrough units and query for each unit if it does not exist throw an error;
		for (const unit of units) {
			const unitExists = await this.unitDao.findUnitById(unit);
			if (!unitExists) {
				throw new ExpressError({
					data: {},
					message: `Unit ${unit} not found`,
					status: 'error',
					statusCode: 404,
				});
			}
		}


		const res = await this.lecturerDao.createLecturer({
			dateOfBirth: nl.getDateOfBirth(),
			department: nl.getDepartment(),
			email: nl.getEmail(),
			firstName: nl.getFirstName(),
			lastName: nl.getLastName(),
			password: nl.getPassword(),
			staffId: nl.getStaffId(),
			hudumaNumber: nl.getHudumaNumber(),
			phone: nl.getPhone(),
			nationalId: nl.getNationalId(),
			units: nl.getUnits(),
		});

		return res;
	};

	updateLecturer = async (id: string, lecturer: Partial<ILecturer>) => {
		const existingLecturer = await this.lecturerDao.findLecturerById(id);
		const ul = lecturerDTO({ ...existingLecturer!, ...lecturer });
		const res = await this.lecturerDao.updateLecturer(id, {
			dateOfBirth: ul.getDateOfBirth(),
			department: ul.getDepartment(),
			email: ul.getEmail(),
			firstName: ul.getFirstName(),
			lastName: ul.getLastName(),
			password: ul.getPassword(),
			staffId: ul.getStaffId(),
			hudumaNumber: ul.getHudumaNumber(),
			phone: ul.getPhone(),
			nationalId: ul.getNationalId(),
			units: ul.getUnits(),
		});

		return res;
	};

	deleteLecturer = async (id: string) => {
		const response = await this.lecturerDao.deleteLecturer(id);

		return response;
	};

	getLecturerByReg = async (reg: string) => {
		const response = await this.lecturerDao.findLecturerByReg(reg);

		return response;
	};

	getLecturerById = async (id: string) => {
		if (!validateMongodbId(id)) {
			throw new ExpressError({
				statusCode: 400,
				message: 'Invalid lecturer id',
				status: 'warning',
				data: {},
			});
		}
		const response = await this.lecturerDao.findLecturerById(id);

		return response;
	};

	searchLecturer = async (query: string) => {
		const res = await this.lecturerDao.searchLecturer(query);

		return res;
	};

	getLecturers = async (limit: number, page: number) => {
		return await this.lecturerDao.getAllLecturers(limit, page);
	};
}

export default new LecturerService();
