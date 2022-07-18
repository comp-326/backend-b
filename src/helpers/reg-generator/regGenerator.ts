/* eslint-disable @typescript-eslint/no-explicit-any */

import { Password } from '@comp326-helpers/password';

// Get the current date in the format as string
const getCurrentCode = () => {
	const date = new Date();

	return {
		middleCode: date.getTime().toString().slice(7, 13),
		year: date.getFullYear().toString().slice(2, 4),
	};
};

export const createStudentRegistrationNumber = (courseCode: string) => {
	const { middleCode, year } = getCurrentCode();
	const regNumber = `${courseCode.toUpperCase()}/${middleCode}/${year}`;
	const password = Password.hash(regNumber);

	return { regNumber, password };
};

export const createStaffRegistrationNumber = async () => {
	const { middleCode, year } = getCurrentCode();
	const staffId = `staff/${middleCode}/${year}`;
	const password = await Password.hash(staffId);

	return { staffId, password };
};

export const generateSessionUnitCode = (
	sessionYear: number,
	sessionSemester: number,
	courseCode: string,
) => {
	const code = `${courseCode}-Y${sessionYear}-S${sessionSemester}`;

	return code;
};
