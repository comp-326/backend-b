import { ExpressError } from '@comp326-common/errors/ExpressError';
import { ILecturer } from 'src/schema/Lecturer.schema';
import moment from 'moment';
import validateMongodbId from '@comp326-helpers/validators/validateMongoId';
import { emailRegex, idNumberRegex, phoneRegex } from '@comp326-constants/regex';

export const lecturerValidator = (lecturer: ILecturer) => {
	const {
		dateOfBirth,
		department,
		email,
		firstName,
		lastName,
		nationalId,
		password,
		phone,
		units,
	} = lecturer;
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
	if (email && !emailRegex.test(email)) {
		throw new ExpressError({
			data: {},
			message: 'Invalid email address required',
			status: 'error',
			statusCode: 400,
		});
	}
	if (!department) {
		throw new ExpressError({
			data: {},
			message: 'Department required',
			status: 'error',
			statusCode: 400,
		});
	}
	if (!validateMongodbId(department)) {
		throw new ExpressError({
			data: {},
			message: 'Invalid department id',
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
	if (!moment(new Date(dateOfBirth).getTime()).isBefore(Date.now())) {
		throw new ExpressError({
			data: {},
			message: 'Date cannot come after today date required',
			status: 'error',
			statusCode: 400,
		});
	}

	if (units.length === 0 || !Array.isArray(units)) {
		throw new ExpressError({
			data: {},
			message: 'Lecturer must be assigned at least 1 unit',
			status: 'error',
			statusCode: 400,
		});
	}
	if (!(units.length > 0)) {
		units.forEach((unit) => {
			if (!validateMongodbId(unit)) {
				throw new ExpressError({
					data: {},
					message: 'Invalid unit id',
					status: 'error',
					statusCode: 400,
				});
			}
		});
	}

	if (
		moment(Date.now()).year() -
        moment(new Date(dateOfBirth).getTime()).year() <
        18
	) {
		throw new ExpressError({
			data: {},
			message: 'Lecturer must be over 18years old',
			status: 'error',
			statusCode: 400,
		});
	}
};