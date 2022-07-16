import studentService from '../services/student.service';
import { INext, IReq, IRes } from '@comp326-common/requests';

class StudentController {
	private _studentService = studentService;

	public get studentService() {
		return this._studentService;
	}

	createStudent = async (req: IReq, res: IRes, next: INext) => {
		try {
			
			const response = await studentService.createStudent(req.body);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	updateStudent = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await studentService.updateStudent(
				req.params.id,
				req.body,
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	deleteStudent = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await studentService.deleteStudent(req.params.id);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	getStudentById = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await studentService.getStudentById(req.params.id);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	getStudentByReg = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await studentService.getStudentByReg(
				req.params.reg,
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	getStudents = async (req: IReq, res: IRes, next: INext) => {
		try {
			const limit = req.query.limit ? req.query.limit : 50;
			const page = req.query.limit ? req.page.limit : 1;
			const response = await studentService.getStudents(
				<number>(<unknown>limit),
				<number>(<unknown>page),
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	searchStudent = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await studentService.searchStudent(
				req.query.q as unknown as string,
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};
}

export default new StudentController();
