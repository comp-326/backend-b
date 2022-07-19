import { ExpressError } from '@comp326-common/errors/ExpressError';
import StudentModel from '@comp326-schema/Student.schema';
import StudentSession, {
	IStudentSession,
} from '@comp326-schema/StudentSession.schema';

class StudentSessionDao {
	getAllStudentSessions = async (limit: number, page: number) => {
		const studentSessions = await StudentSession.find()
			.skip(limit * (page - 1))
			.limit(limit);

		return studentSessions;
	};

	getLecturerUnitRegisteredStudents = async (unit: string, year: number, semester: number) => {
		const studentSessions = await StudentSession.find({
			$and: [
				{ unit: { $in:[unit] } },
				{ sessionYear: year },
				{ sessionSemester: semester },
			]
		}).populate('student').populate('results').populate('units').populate('results.unit');

		return studentSessions;
	};


	createStudentSession = async (studentSession: IStudentSession) => {
		const existingStudentSession = await StudentSession.findOne({
			$and: [
				{ student: studentSession.student },
				{ sessionYear: studentSession.sessionYear },
				{ sessionSemester: studentSession.sessionSemester },
			],
		});
		if (existingStudentSession) {
			throw new ExpressError({
				status: 'warning',
				statusCode: 400,
				message: 'Student session already exists',
				data: {},
			});
		}
		const student = await StudentModel.findById(studentSession.student);
		if (!student) {
			throw new ExpressError({
				status: 'warning',
				statusCode: 400,
				message: 'Student does not exist',
				data: {},
			});
		}
		const newStudentSession = await StudentSession.create(studentSession);

		await student.updateOne({
			currentSession: newStudentSession._id,
		});

		return newStudentSession;
	};

	updateStudentSession = async (
		id: string,
		studentSession: IStudentSession,
	) => {
		const updated = await StudentSession.findByIdAndUpdate(id, {
			...studentSession,
		});

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
