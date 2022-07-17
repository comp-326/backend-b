import { ExpressError } from '@comp326-common/errors/ExpressError';
import validateMongodbId from '@comp326-helpers/validators/validateMongoId';

export class DepartmentDto {
	private _name: string;

	private _cod: string;

	private _faculty: string;

	constructor(name: string, cod: string, faculty: string) {
		if (!name) {
			throw new ExpressError({
				data: {},
				message: 'Department name required',
				status: 'error',
				statusCode: 400,
			});
		}
		if (!cod) {
			throw new ExpressError({
				data: {},
				message: 'Department cod required',
				status: 'error',
				statusCode: 400,
			});
		}
		if (!faculty) {
			throw new ExpressError({
				data: {},
				message: 'Department faculty required',
				status: 'error',
				statusCode: 400,
			});
		}
		if (!validateMongodbId(faculty)) {
			throw new ExpressError({
				data: {},
				message: 'Invalid faculty id',
				status: 'error',
				statusCode: 400,
			});
		}
		this._name = name;
		this._cod = cod;
		this._faculty = faculty;
	}

	get name() {
		return this._name;
	}

	get cod() {
		return this._cod;
	}

	get faculty() {
		return this._faculty;
	}

	toJSon = () => {
		return {
			name: this.name,
			cod: this.cod,
			faculty: this.faculty,
		};
	};
}
