/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@comp326-db/mongodb';

interface ICourse {
	name: string;
	prefix: string;
}

interface ICourseDocument extends mongoose.Document, ICourse {
	_doc: ICourse;
}

export interface ICourseDocumentModel extends mongoose.Model<ICourseDocument> {
	search: (query: string) => Promise<any>;
}

const courseSchema: mongoose.Schema<ICourseDocument> = new mongoose.Schema(
	{
		name: { type: String },
		prefix: { type: String },
	},
	{ timestamps: true },
);

// eslint-disable-next-line @typescript-eslint/naming-convention
const CourseModel = mongoose.model<ICourseDocument, ICourseDocumentModel>(
	'course',
	courseSchema,
);

export default CourseModel;
