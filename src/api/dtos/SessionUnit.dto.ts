/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpressError } from '@comp326-common/errors/ExpressError';
import validateMongodbId from '@comp326-helpers/validators/validateMongoId';

export class SessionUnitDto {
	private _sessionYear: number;

	private _course: string;

	private _code: string;

	private _sessionSemester: number;

	private _year: number;

	private _units: any[];

	constructor(
		sessionYear: number,
		sessionSemester: number,
		year = new Date().getFullYear(),
		units: any[],
		course: string,
		code: string,
	) {
		if (units && units.length > 0) {
			units.forEach((unit) => {
				if (!validateMongodbId(unit.id)) {
					throw new ExpressError({
						data: {},
						message: `Invalid unit id ${unit}`,
						status: 'error',
						statusCode: 400,
					});
				}
			});
		}
		if (!sessionSemester) {
			throw new ExpressError({
				data: {},
				message: 'Session semester  required',
				status: 'error',
				statusCode: 400,
			});
		}
		if (!course) {
			throw new ExpressError({
				data: {},
				message: 'Session course  required',
				status: 'error',
				statusCode: 400,
			});
		}
		if (!code) {
			throw new ExpressError({
				data: {},
				message: 'Session code  required',
				status: 'error',
				statusCode: 400,
			});
		}
		if (!sessionYear) {
			throw new ExpressError({
				data: {},
				message: 'Session year required',
				status: 'error',
				statusCode: 400,
			});
		}

		this._sessionYear = sessionYear;
		this._sessionSemester = sessionSemester;
		this._year = year;
		this._course = course;
		this._units = units;
		this._code = code;
	}

	get sessionYear() {
		return this._sessionYear;
	}

	get course() {
		return this._course;
	}

	get code() {
		return this._code;
	}

	get sessionSemester() {
		return this._sessionSemester;
	}

	get year() {
		return this._year;
	}

	get units() {
		return this._units;
	}

	toJSon = () => {
		return {
			sessionYear: this.sessionYear,
			sessionSemester: this.sessionSemester,
			year: this.year,
			course: this.course,
			units: this.units,
			code: this.code,
		};
	};
}
