/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@comp326-db/mongodb';

export interface IStudent {
	firstName: string;
	lastName: string;
	dateOfBirth: Date;
	regNo: string;
	email: string;
	phone: string;
	nationalId: string;
	hudumaNumber: string;
	password: string;
	course: any;
}

interface IStudentDocument extends mongoose.Document, IStudent {
	_doc: IStudent;
}

export interface IStudentDocumentModel
	extends mongoose.Model<IStudentDocument> {
	findByRegNo: (reg: string) => Promise<any>;
}

const studentSchema: mongoose.Schema<IStudentDocument> = new mongoose.Schema({
	firstName: { type: String },
	lastName: { type: String },
	dateOfBirth: { type: mongoose.SchemaTypes.Date },
	regNo: { type: String, unique: true },
	hudumaNumber: { type: String, unique: true,deafult:'' },
	phone: { type: String, unique: true, min: 10, max: 13, trim: true },
	email: { type: String, required: true, unique: true, trim: true },
	nationalId: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		min: 7,
		max: 10,
	},
	password: { type: String, minlength: 8, required: true },
	course: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'course',
		required: true,
	},
});

// eslint-disable-next-line @typescript-eslint/naming-convention
const StudentModel = mongoose.model<IStudentDocument, IStudentDocumentModel>(
	'student',
	studentSchema,
);

export default StudentModel;
