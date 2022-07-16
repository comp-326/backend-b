export class CourseDto {
	private _name: string;

	private _prefix: string;

	constructor(name: string, prefix: string) {
		this._name = name;
		this._prefix = prefix;
	}

	get name() {
		return this._name;
	}

	get prefix() {
		return this._prefix;
	}

	toJSon = () => {
		return {
			name: this.name,
			prefix: this.prefix,
		};
	};
}
