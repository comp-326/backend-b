import studentSessionService from '../services/studentSession.service';
import { INext, IReq, IRes } from '@comp326-common/requests';

class StudentSessionController {
	private _studentSessionService = studentSessionService;

	public get studentSessionService() {
		return this._studentSessionService;
	}

	createStudentSession = async (req: IReq, res: IRes, next: INext) => {
		try {
			
			const response = await studentSessionService.createStudentSession(req.body);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	updateStudentSession = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await studentSessionService.updateStudentSession(
				req.params.id,
				req.body,
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	deleteStudentSession = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await studentSessionService.deleteStudentSession(req.params.id);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	getStudentSessionById = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await studentSessionService.getStudentSessionById(req.params.id);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	getStudentSessionByReg = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await studentSessionService.getStudentSessionByReg(
				req.params.reg,
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	getStudentSessions = async (req: IReq, res: IRes, next: INext) => {
		try {
			const limit = req.query.limit ? req.query.limit : 50;
			const page = req.query.limit ? req.page.limit : 1;
			const response = await studentSessionService.getStudentSessions(
				<number>(<unknown>limit),
				<number>(<unknown>page),
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	searchStudentSession = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await studentSessionService.searchStudentSession(
				req.query.q as unknown as string,
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};
}

export default new StudentSessionController();
