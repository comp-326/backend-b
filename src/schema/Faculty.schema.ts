/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@comp326-db/mongodb';

export interface IFaculty {
	name: string;
    dean:any
}

interface IFacultyDocument extends mongoose.Document, IFaculty {
	_doc: IFaculty;
}

export interface IFacultyDocumentModel extends mongoose.Model<IFacultyDocument> {
	search: (query: string) => Promise<any>;
}

const facultySchema: mongoose.Schema<IFacultyDocument> = new mongoose.Schema(
	{
		name: { type: String },
		dean: { type: mongoose.SchemaTypes.ObjectId, ref: 'lecturer' },
	},
	{ timestamps: true },
);

// eslint-disable-next-line @typescript-eslint/naming-convention
const FacultyModel = mongoose.model<IFacultyDocument, IFacultyDocumentModel>(
	'faculty',
	facultySchema,
);

export default FacultyModel;
