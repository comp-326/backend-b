import { ExpressError } from '@comp326-common/errors/ExpressError';
import validateMongodbId from '@comp326-helpers/validators/validateMongoId';

export class UnitDto {
	private _name: string;

	private _code: string;

	private _department: string;

	private _year: number;

	private _semester: number;

	constructor(
		name: string,
		code: string,
		department: string,
		year: number,
		semester: number,
	) {
		if (!name) {
			throw new ExpressError({
				data: {},
				message: 'Unit name required',
				status: 'error',
				statusCode: 400,
			});
		}
		if (!year) {
			throw new ExpressError({
				data: {},
				message: 'Unit year required',
				status: 'error',
				statusCode: 400,
			});
		}
		if (!semester) {
			throw new ExpressError({
				data: {},
				message: 'Unit semester required',
				status: 'error',
				statusCode: 400,
			});
		}
		if (!code) {
			throw new ExpressError({
				data: {},
				message: 'Unit code required',
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
		this._department = department;
		this._name = name;
		this._code = code;
		this._year = year;
		this._semester = semester;
	}

	get name() {
		return this._name;
	}

	get code() {
		return this._code;
	}

	get year() {
		return this._year;
	}

	get semester() {
		return this._semester;
	}

	get department() {
		return this._department;
	}

	toJSon = () => {
		return {
			name: this.name,
			code: this.code,
			department: this.department,
			year: this.year,
			semester: this.semester,
		};
	};
}
