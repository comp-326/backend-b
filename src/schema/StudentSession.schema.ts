/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@comp326-db/mongodb';

export interface IStudentSession {
	student: any;
	sessionYear: number;
	sessionSemester: number;
	year: number;
	passed: boolean;
	units: any[];
	results: IResult[];
}

export type gradeType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface IResult {
	unit: any;
	grade: gradeType;
	remarks?: string;
	score: number;
}

interface IStudentSessionDocument extends mongoose.Document, IStudentSession {
	_doc: IStudentSession;
}

export interface IStudentSessionDocumentModel
	extends mongoose.Model<IStudentSessionDocument> {
	search: (query: string) => Promise<any>;
}

const studentSessionSchema: mongoose.Schema<IStudentSessionDocument> =
	new mongoose.Schema(
		{
			student: { type: mongoose.Schema.Types.ObjectId, ref: 'student', required: true },
			sessionYear: { type: Number },
			sessionSemester: { type: Number },
			year: { type: Number },
			passed: { type: Boolean },
			units: {
				type: [mongoose.SchemaTypes.ObjectId],
				ref: 'unit',
				default: [],
			},
			results: {
				type: [
					{
						unit: {
							type: mongoose.SchemaTypes.ObjectId,
							ref: 'unit',
						},
						grade: {
							type: String,
							required: true,
							enum: ['A', 'B', 'C', 'D', 'E', 'F'],
						},
						remarks: { type: String, required: true },
						score: {
							type: Number,
							min: 0,
							max: 100,
							required: true,
						},
					},
				],
				default: [],
			},
		},
		{ timestamps: true },
	);

// eslint-disable-next-line @typescript-eslint/naming-convention
const StudentSessionModel = mongoose.model<
	IStudentSessionDocument,
	IStudentSessionDocumentModel
>('studentSession', studentSessionSchema);

export default StudentSessionModel;
