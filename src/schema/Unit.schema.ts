/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@comp326-db/mongodb';

export interface IUnit {
	name: string;
	code: string;
	department: any;
	year: number;
	semester: number;
}

interface IUnitDocument extends mongoose.Document, IUnit {
	_doc: IUnit;
}

export interface IUnitDocumentModel extends mongoose.Model<IUnitDocument> {
	search: (query: string) => Promise<any>;
}

const unitSchema: mongoose.Schema<IUnitDocument> = new mongoose.Schema(
	{
		name: { type: String, unique: true },
		code: { type: String, unique: true, uppercase: true },
		department: { type: mongoose.SchemaTypes.ObjectId, ref: 'department' },
	},
	{ timestamps: true },
);

// eslint-disable-next-line @typescript-eslint/naming-convention
const UnitModel = mongoose.model<IUnitDocument, IUnitDocumentModel>(
	'unit',
	unitSchema,
);

export default UnitModel;
