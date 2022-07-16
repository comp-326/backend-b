import { ExpressError } from '@comp326-common/errors/ExpressError';
import moment from 'moment';
import validateMongodbId from '@comp326-helpers/validators/validateMongoId';

export class StudentDto {
	private _firstName: string;

	private _lastName: string;

	private _dateOfBirth: Date;

	private _regNo: string;

	private _course: string;

	constructor(
		firstName: string,
		lastName: string,
		dateOfBirth: Date,
		regNo: string,
		course: string,
	) {
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
		if (!moment(dateOfBirth).isAfter(Date.now())) {
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
		if (!regNo) {
			throw new ExpressError({
				data: {},
				message: 'Student reg number required',
				status: 'error',
				statusCode: 400,
			});
		}
		this._firstName = firstName;
		this._lastName = lastName;
		this._dateOfBirth = dateOfBirth;
		this._regNo = regNo;
		this._course = course;
	}

	get firstName() {
		return this._firstName;
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
			course: this.course,
		};
	};
}
