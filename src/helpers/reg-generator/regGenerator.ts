/* eslint-disable @typescript-eslint/no-explicit-any */
const getCurrentCode = () => {
	const date = new Date();

	return {
		middleCode: date.getTime().toString().slice(7, 13),
		year: date.getFullYear().toString().slice(2, 4),
	};
};

export const createStudentRegistrationNumber =  (courseCode: string) => {
	const { middleCode, year } = getCurrentCode();
	const regNumber = `${courseCode.toUpperCase()}/${middleCode}/${year}`;

	return regNumber;
};

export const createStaffRegistrationNumber =  () => {
	const { middleCode, year } = getCurrentCode();
	const staffId = `staff/${middleCode}/${year}`;

	return staffId;
};

export const generateSessionUnitCode = (
	sessionYear: number,
	sessionSemester: number,
	courseCode: string,
) => {
	const code = `${courseCode}-Y${sessionYear}-S${sessionSemester}`;

	return code;
};
