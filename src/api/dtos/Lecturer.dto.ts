/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILecturer } from '@comp326-schema/Lecturer.schema';
import { generateHudumaNumber } from '@comp326-helpers/hudumaNumber';
import { lecturerValidator } from 'src/validators/lecturerValidator';

export const lecturerDTO = (lecturer: ILecturer) => {

	lecturerValidator(lecturer);

	return Object.freeze({
		getFirstName: () => lecturer.firstName,
		getLastName: () => lecturer.lastName,
		getDateOfBirth: () => lecturer.dateOfBirth,
		getStaffId: () => lecturer.staffId,
		getDepartment: () => lecturer.department,
		getEmail: () => lecturer.email,
		getPhone: () => lecturer.phone,
		getNationalId: () => lecturer.nationalId,
		getHudumaNumber: () => lecturer.hudumaNumber ? lecturer.hudumaNumber : generateHudumaNumber(),
		getPassword: () => lecturer.password,
		getUnits: () => lecturer.units,
	});
};
