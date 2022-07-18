/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpressError } from '@comp326-common/errors/ExpressError';
import { IStudent } from '@comp326-schema/Student.schema';
import { generateHudumaNumber } from '@comp326-helpers/hudumaNumber';
import moment from 'moment';
import validateMongodbId from '@comp326-helpers/validators/validateMongoId';
import { emailRegex, idNumberRegex, phoneRegex } from '@comp326-constants/regex';

export class StudentDto {
	private _firstName: string;

	private _lastName: string;

	private _dateOfBirth: Date;

	private _regNo: string;

	private _email: string;

	private _phone: string;

	private _nationalId: string;

	private _hudumaNumber: string;

	private _password: string;

	private _course: any;

	private _currentSession: any;

	constructor(
		{ course, dateOfBirth, email, firstName, hudumaNumber, lastName, nationalId, password, phone, regNo, currentSession }: IStudent
	) {
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
		this._firstName = firstName;
		this._lastName = lastName;
		this._dateOfBirth = dateOfBirth;
		this._regNo = regNo;
		this._email = email;
		this._phone = phone;
		this._nationalId = nationalId;
		this._hudumaNumber = hudumaNumber ? hudumaNumber : generateHudumaNumber();
		this._password = password;
		this._course = course;
		this._currentSession = currentSession;

	}

	get firstName() {
		return this._firstName;
	}

	get email() {
		return this._email;
	}

	get phone() {
		return this._phone;
	}

	get nationalId() {
		return this._nationalId;
	}

	get hudumaNumber() {
		return this._hudumaNumber;
	}

	get password() {
		return this._password;
	}

	get currentSession() {
		return this._currentSession;
	}

	get lastName() {
		return this._lastName;
	}

	get dateOfBirth() {
		return this._dateOfBirth;
	}

	get course() {
		return this._course;
	}

	get regNo() {
		return this._regNo;
	}

	toJSon = () => {
		return {
			firstName: this.firstName,
			lastName: this.lastName,
			dateOfBirth: this.dateOfBirth,
			regNo: this.regNo,
			email: this.email,
			phone: this.phone,
			nationalId: this.nationalId,
			hudumaNumber: this.hudumaNumber,
			password: this.password,
			course: this.course,
			currentSession: this.currentSession,
		};
	};
}
