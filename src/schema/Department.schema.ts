/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@comp326-db/mongodb';

export interface IDepartment {
	name: string;
	cod?: string;
	faculty: any;
}

interface IDepartmentDocument extends mongoose.Document, IDepartment {
	_doc: IDepartment;
}

export interface IDepartmentDocumentModel
	extends mongoose.Model<IDepartmentDocument> {
	search: (query: string) => Promise<any>;
}

const departmentSchema: mongoose.Schema<IDepartmentDocument> =
	new mongoose.Schema(
		{
			name: { type: String, unique: true },
			cod: { type: String, default: '' },
			faculty: { type: mongoose.SchemaTypes.ObjectId, ref: 'faculty' },
		},
		{ timestamps: true },
	);

// eslint-disable-next-line @typescript-eslint/naming-convention
const DepartmentModel = mongoose.model<
	IDepartmentDocument,
	IDepartmentDocumentModel
>('department', departmentSchema);

export default DepartmentModel;
