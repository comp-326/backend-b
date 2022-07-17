import { ExpressError } from '@comp326-common/errors/ExpressError';
// import validateMongodbId from '@comp326-helpers/validators/validateMongoId';

export class FacultyDto {
	private _name: string;

	// private _dean?: string;

	constructor(name: string/* dean = ''8 */) {
		if (!name) {
			throw new ExpressError({
				data: {},
				message: 'Faculty name required',
				status: 'error',
				statusCode: 400,
			});
		}
		// if (!dean) {
		// 	throw new ExpressError({
		// 		data: {},
		// 		message: 'Faculty dean required',
		// 		status: 'error',
		// 		statusCode: 400,
		// 	});
		// }
		// if (dean && !validateMongodbId(dean)) {
		// 	throw new ExpressError({
		// 		data: {},
		// 		message: 'Invalid dean id',
		// 		status: 'error',
		// 		statusCode: 400,
		// 	});
		// }
		this._name = name;
		// this._dean = dean;
	}

	get name() {
		return this._name;
	}

	// get dean() {
	// 	return this._dean;
	// }

	toJSon = () => {
		return {
			name: this.name,
			// dean: this.dean,
		};
	};
}
