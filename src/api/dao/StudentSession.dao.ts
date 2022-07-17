import StudentSession, { IStudentSession } from '@comp326-schema/StudentSession.schema';

class StudentSessionDao {
	getAllStudentSessions = async (limit: number, page: number) => {
		const studentSessions = await StudentSession.find()
			.skip(limit * (page - 1))
			.limit(limit);

		return studentSessions;
	};

	createStudentSession = async (studentSession: IStudentSession) => {
		const newStudentSession = await StudentSession.create(studentSession);

		return newStudentSession;
	};

	updateStudentSession = async (id: string, studentSession: IStudentSession) => {
		const updated = await StudentSession.findByIdAndUpdate(id, { ...studentSession });

		return updated;
	};

	deleteStudentSession = async (id: string) => {
		await StudentSession.findByIdAndUpdate(id, { $set: { deleted: true } });

		return true;
	};

	searchStudentSession = async (query: string) => {
		return await StudentSession.find({ query });
	};

	findStudentSessionById = async (id: string) => {
		return await StudentSession.findById(id);
	};

	findStudentSessionByReg = async (reg: string) => {
		return await StudentSession.findOne({ reg });
	};
}

export default new StudentSessionDao();
