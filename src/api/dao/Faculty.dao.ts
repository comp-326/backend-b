import Faculty, { IFaculty } from '@comp326-schema/Faculty.schema';

class FacultyDao {
	getAllFacultys = async (limit: number, page: number) => {
		const faculties = await Faculty.find()
			.skip(limit * (page - 1))
			.limit(limit);

		return faculties;
	};

	createFaculty = async (faculty: IFaculty) => {
		const newFaculty = await Faculty.create(faculty);

		return newFaculty;
	};

	updateFaculty = async (id: string, faculty: IFaculty) => {
		const updated = await Faculty.findByIdAndUpdate(id, { ...faculty });

		return updated;
	};

	deleteFaculty = async (id: string) => {
		await Faculty.findByIdAndUpdate(id, { $set: { deleted: true } });

		return true;
	};

	searchFaculty = async (query: string) => {
		return await Faculty.find({ query });
	};

	findFacultyById = async (id: string) => {
		return await Faculty.findById(id);
	};

	findFacultyByReg = async (reg: string) => {
		return await Faculty.findOne({ reg });
	};
}

export default new FacultyDao();
