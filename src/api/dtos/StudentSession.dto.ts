/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpressError } from '@comp326-common/errors/ExpressError';
import { IResult } from '@comp326-schema/StudentSession.schema';
import validateMongodbId from '@comp326-helpers/validators/validateMongoId';

export class StudentSessionDto {
	private _student: string;

	private _sessionYear: number;

	private _sessionSemester: number;

	private _year: number;

	private _passed: boolean;

	private _units: any[];

	private _results: IResult[];

	constructor(
		student: string,
		sessionYear: number,
		sessionSemester: number,
		year: number,
		passed: boolean,
		units: any[] = [],
		results: IResult[] = [],
	) {
		if (!student) {
			throw new ExpressError({
				data: {},
				message: 'Student id required',
				status: 'error',
				statusCode: 400,
			});
		}
		if (!sessionYear) {
			throw new ExpressError({
				data: {},
				message: 'Session session required',
				status: 'error',
				statusCode: 400,
			});
		}
		if (units.length === 0) {
			throw new ExpressError({
				data: {},
				message: 'Units required',
				status: 'error',
				statusCode: 400,
			});
		}
		if (units && units.length > 0) {
			units.forEach((unit) => {
				if (!validateMongodbId(unit)) {
					throw new ExpressError({
						data: {},
						message: `Invalid unit id ${unit}`,
						status: 'error',
						statusCode: 400,
					});
				}
			});
		}
		if (results && results.length > 0) {
			results.forEach((result) => {
				if (!validateMongodbId(result.unit)) {
					throw new ExpressError({
						data: {},
						message: `Invalid unit id ${result.unit}`,
						status: 'error',
						statusCode: 400,
					});
				}
				if (!result.score) {
					throw new ExpressError({
						data: {},
						message: 'Marks required',
						status: 'error',
						statusCode: 400,
					});
				}
			});
		}
		if (!sessionSemester) {
			throw new ExpressError({
				data: {},
				message: 'Session semester required',
				status: 'error',
				statusCode: 400,
			});
		}
		if (!validateMongodbId(student)) {
			throw new ExpressError({
				data: {},
				message: 'Invalid department id',
				status: 'error',
				statusCode: 400,
			});
		}
		this._student = student;
		this._sessionYear = sessionYear;
		this._sessionSemester = sessionSemester;
		this._year = year;
		this._passed = passed;
		this._units = units;
		this._results = results;
	}

	get student() {
		return this._student;
	}

	get sessionYear() {
		return this._sessionYear;
	}

	get sessionSemester() {
		return this._sessionSemester;
	}

	get year() {
		return this._year;
	}

	get passed() {
		return this._passed;
	}

	get units() {
		return this._units;
	}

	get results() {
		return this._results;
	}

	toJSon = () => {
		return {
			student: this.student,
			sessionYear: this.sessionYear,
			sessionSemester: this.sessionSemester,
			year: this.year,
			passed: this.passed,
			units: this.units,
			results: this.results,
		};
	};
}
