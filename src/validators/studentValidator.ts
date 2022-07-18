import { ExpressError } from '@comp326-common/errors/ExpressError';
import { IStudent } from '@comp326-schema/Student.schema';
import moment from 'moment';
import validateMongodbId from '@comp326-helpers/validators/validateMongoId';
import { emailRegex, idNumberRegex, phoneRegex } from '@comp326-constants/regex';

export const studentValidator = (student: IStudent) => {
	const { course, dateOfBirth, email, firstName, lastName, nationalId, password, phone } = student;
	console.log(student);

	if (!nationalId) {
		throw new ExpressError({
			data: {},
			message: 'National id number required',
			status: 'error',
			statusCode: 400,
		});
	}
	if (nationalId && !idNumberRegex.test(nationalId)) {
		throw new ExpressError({
			data: {},
			message: 'Invalid national id number',
			status: 'error',
			statusCode: 400,
		});
	}
	if (!password) {
		throw new ExpressError({
			data: {},
			message: 'Password  field required',
			status: 'error',
			statusCode: 400,
		});
	}
	if (!phone) {
		throw new ExpressError({
			data: {},
			message: 'Phone number required',
			status: 'error',
			statusCode: 400,
		});
	}
	if (phone && !phoneRegex.test(phone)) {
		throw new ExpressError({
			data: {},
			message: 'Please provide valid number',
			status: 'error',
			statusCode: 400,
		});
	}
	if (!email) {
		throw new ExpressError({
			data: {},
			message: 'Email address required',
			status: 'error',
			statusCode: 400,
		});
	}
	if (email && !emailRegex.test(email)) {
		throw new ExpressError({
			data: {},
			message: 'Invalid email address required',
			status: 'error',
			statusCode: 400,
		});
	}
	if (!course) {
		throw new ExpressError({
			data: {},
			message: 'Course required',
			status: 'error',
			statusCode: 400,
		});
	}
	if (!validateMongodbId(course)) {
		throw new ExpressError({
			data: {},
			message: 'Invalid course id',
			status: 'error',
			statusCode: 400,
		});
	}
	if (!firstName) {
		throw new ExpressError({
			data: {},
			message: 'First name required',
			status: 'error',
			statusCode: 400,
		});
	}
	if (!lastName) {
		throw new ExpressError({
			data: {},
			message: 'Last name required',
			status: 'error',
			statusCode: 400,
		});
	}
	if (!dateOfBirth) {
		throw new ExpressError({
			data: {},
			message: 'Date of birth required',
			status: 'error',
			statusCode: 400,
		});
	}
	if (!moment(dateOfBirth).isValid()) {
		throw new ExpressError({
			data: {},
			message: 'Please provide valid date required',
			status: 'error',
			statusCode: 400,
		});
	}
	if (!moment(dateOfBirth).isBefore(Date.now())) {
		throw new ExpressError({
			data: {},
			message: 'Date cannot come after today date required',
			status: 'error',
			statusCode: 400,
		});
	}
	if (moment(Date.now()).year() - moment(dateOfBirth).year() < 18) {
		throw new ExpressError({
			data: {},
			message: 'Student must be over 18years old',
			status: 'error',
			statusCode: 400,
		});
	}
};