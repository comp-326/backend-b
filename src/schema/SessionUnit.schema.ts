/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@comp326-db/mongodb';

export interface ISessionUnit {
	sessionYear: number;
	sessionSemester: number;
	year: number;
	code:string
	course: any;
	units: any[];
}

interface ISessionUnitDocument extends mongoose.Document, ISessionUnit {
	_doc: ISessionUnit;
}

export interface ISessionUnitDocumentModel
	extends mongoose.Model<ISessionUnitDocument> {
	search: (query: string) => Promise<any>;
}

const sessionUnitSchema: mongoose.Schema<ISessionUnitDocument> =
	new mongoose.Schema(
		{
			sessionYear: { type: Number },
			sessionSemester: { type: Number },
			year: { type: Number },
			code: {
				type: String,
				unique: true,
				required: true,
				uppercase: true,
			},
			course: {
				type: mongoose.SchemaTypes.ObjectId,
				ref: 'course',
				required: true,
			},
			units: {
				type: [mongoose.SchemaTypes.ObjectId],
				ref: 'unit',
				default: [],
			},
		},
		{ timestamps: true },
	);

// eslint-disable-next-line @typescript-eslint/naming-convention
const SessionUnitModel = mongoose.model<
	ISessionUnitDocument,
	ISessionUnitDocumentModel
>('sessionUnit', sessionUnitSchema);

export default SessionUnitModel;
