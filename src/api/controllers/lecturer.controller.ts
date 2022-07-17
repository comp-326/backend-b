import lecturerService from '../services/lecturer.service';
import { INext, IReq, IRes } from '@comp326-common/requests';

class LecturerController {
	private _lecturerService = lecturerService;

	public get lecturerService() {
		return this._lecturerService;
	}

	createLecturer = async (req: IReq, res: IRes, next: INext) => {
		try {
			console.log(req.body);
			
			const response = await lecturerService.createLecturer(req.body);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	updateLecturer = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await lecturerService.updateLecturer(
				req.params.id,
				req.body,
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	deleteLecturer = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await lecturerService.deleteLecturer(req.params.id);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	getLecturerById = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await lecturerService.getLecturerById(req.params.id);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	getLecturerByReg = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await lecturerService.getLecturerByReg(
				req.params.reg,
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	getLecturers = async (req: IReq, res: IRes, next: INext) => {
		try {
			const limit = req.query.limit ? req.query.limit : 50;
			const page = req.query.limit ? req.page.limit : 1;
			const response = await lecturerService.getLecturers(
				<number>(<unknown>limit),
				<number>(<unknown>page),
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	searchLecturer = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await lecturerService.searchLecturer(
				req.query.q as unknown as string,
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};
}

export default new LecturerController();
