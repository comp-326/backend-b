/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@comp326-db/mongodb';

export interface ILecturer {
	firstName: string;
	lastName: string;
	dateOfBirth: Date;
	staffId: string;
	department: any;
	units: any[];
}

interface ILecturerDocument extends mongoose.Document, ILecturer {
	_doc: ILecturer;
}

export interface ILecturerDocumentModel
	extends mongoose.Model<ILecturerDocument> {
	findByStaffId: (reg: string) => Promise<any>;
}

const lecturerSchema: mongoose.Schema<ILecturerDocument> = new mongoose.Schema({
	firstName: { type: String },
	lastName: { type: String },
	dateOfBirth: { type: mongoose.SchemaTypes.Date },
	staffId: { type: String, required: true, unique: true },
	department: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'department',
		required: true,
	},
	units: {
		type: [mongoose.SchemaTypes.ObjectId],
		ref: 'unit',
		required: true,
	},
});
lecturerSchema.index(
	{ staffId: 'text', firstName: 'text', lastName: 'text' },
	{ unique: false },
);
// eslint-disable-next-line @typescript-eslint/naming-convention
const LecturerModel = mongoose.model<ILecturerDocument, ILecturerDocumentModel>(
	'lecturer',
	lecturerSchema,
);

export default LecturerModel;
