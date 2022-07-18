/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpressError } from '@comp326-common/errors/ExpressError';
import { ILecturer } from '@comp326-schema/Lecturer.schema';
import moment from 'moment';
import validateMongodbId from '@comp326-helpers/validators/validateMongoId';
import { emailRegex, idNumberRegex, phoneRegex } from '@comp326-constants/regex';

export class LecturerDto {
	private _firstName: string;

	private _lastName: string;

	private _dateOfBirth: Date;

	private _staffId: string;

	private _department: any;

	private _email: string;

	private _phone: string;

	private _nationalId: string;

	private _hudumaNumber: string;

	private _password: string;

	private _units: any[] = [];

	constructor(lec: ILecturer) {
		const {
			dateOfBirth,
			department,
			email,
			firstName,
			hudumaNumber,
			lastName,
			nationalId,
			password,
			phone,
			staffId,
			units,
		} = lec;

		if (!nationalId) {
			throw new ExpressError({
				data: {},
				message: 'National id number required',
				status: 'error',
				statusCode: 400,
			});
		}
		if(nationalId && !idNumberRegex.test(nationalId)) {
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

		this._firstName = firstName;
		this._lastName = lastName;
		this._dateOfBirth = dateOfBirth;
		this._staffId = staffId;
		this._department = department;
		this._email = email;
		this._phone = phone;
		this._nationalId = nationalId;
		this._hudumaNumber = hudumaNumber
			? hudumaNumber
			: new Date().getTime().toString().slice(5, 13);
		this._password = password;
		this._units = units;
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

	get staffId() {
		return this._staffId;
	}

	get department() {
		return this._department;
	}

	get units() {
		return this._units;
	}

	get email() {
		return this._email;
	}

	get phone() {
		return this._phone;
	}

	get hudumaNumber() {
		return this._hudumaNumber;
	}

	get nationalId() {
		return this._nationalId;
	}

	get password() {
		return this._password;
	}

	toJSon = () => {
		return {
			firstName: this.firstName,
			lastName: this.lastName,
			dateOfBirth: this.dateOfBirth,
			staffId: this.staffId,
			department: this.department,
			email: this.email,
			phone: this.phone,
			nationalId: this.nationalId,
			hudumaNumber: this.hudumaNumber,
			password: this.password,
			units: this.units,
		};
	};
}
