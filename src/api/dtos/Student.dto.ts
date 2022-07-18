/* eslint-disable @typescript-eslint/no-explicit-any */
import { IStudent } from '@comp326-schema/Student.schema';
import { studentValidator } from '@comp326-validators/studentValidator';

export const studentDTO = (student: IStudent) => {
	studentValidator(student);

	return {
		getFirstName: () => student.firstName,
		getLastName: () => student.lastName,
		getDateOfBirth: () => student.dateOfBirth,
		getRegNo: () => student.regNo,
		getEmail: () => student.email,
		getPhone: () => student.phone,
		getNationalId: () => student.nationalId,
		getHudumaNumber: () => student.hudumaNumber,
		getPassword: () => student.password,
		getCourse: () => student.course,
		getCurrentSession: () => student.currentSession,
	};
};
