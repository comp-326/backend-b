/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpressError } from '@comp326-common/errors/ExpressError';
import moment from 'moment';
import { createStaffRegistrationNumber as reg } from '@comp326-helpers/reg-generator/regGenerator';
import validateMongodbId from '@comp326-helpers/validators/validateMongoId';

export class LecturerDto {
	private _firstName: string;

	private _lastName: string;

	private _dateOfBirth: Date;

	private _staffId: string;

	private _department: any;

	private _units: any[];

	constructor(
		firstName: string,
		lastName: string,
		dateOfBirth: Date,
		staffId: string,
		department: any,
		units: any[] = [],
	) {
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
		console.log(units);
		
		if ((units.length === 0) || !Array.isArray(units)) {
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
		this._staffId = staffId ? staffId : reg();
		this._units = units;
		this._department = department;
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

	toJSon = () => {
		return {
			firstName: this.firstName,
			lastName: this.lastName,
			dateOfBirth: this.dateOfBirth,
			staffId: this.staffId,
			units: this.units,
			department: this.department,
		};
	};
}
