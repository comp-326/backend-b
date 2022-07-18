/* eslint-disable @typescript-eslint/no-explicit-any */
import { IStudent } from '@comp326-schema/Student.schema';
import { generateHudumaNumber } from '@comp326-helpers/hudumaNumber';
import { studentValidator } from '@comp326-validators/studentValidator';

export const studentDTO = (student: IStudent) => {
	studentValidator(student);

	return Object.freeze({
		getFirstName: () => student.firstName,
		getLastName: () => student.lastName,
		getDateOfBirth: () => student.dateOfBirth,
		getRegNo: () => student.regNo,
		getEmail: () => student.email,
		getPhone: () => student.phone,
		getNationalId: () => student.nationalId,
		getHudumaNumber: () => student.hudumaNumber ? student.hudumaNumber : generateHudumaNumber(),
		getPassword: () => student.password,
		getCourse: () => student.course,
		getCurrentSession: () => student.currentSession,
	});
};
