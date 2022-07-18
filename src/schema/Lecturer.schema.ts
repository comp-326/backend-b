/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@comp326-db/mongodb';

export interface ILecturer {
	firstName: string;
	lastName: string;
	dateOfBirth: Date;
	staffId: string;
	department: any;
	email: string;
	phone: string;
	nationalId: string;
	hudumaNumber: string;
	password: string;
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
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	nationalId: {
		type: String,
		required: true,
		min: 7,
		max: 10,
		trim: true,
	},
	hudumaNumber: {
		type: String,
		required: true,
		unique: true,
		minlength: 8,
		maxLength: 10,
		trim: true,
		default: '',
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		maxlength: 16,
	},
	phone: {
		type: String,
		required: true,
		minlength: 10,
		maxlength: 12,
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
