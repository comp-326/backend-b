import facultyService from '../services/faculty.service';
import { INext, IReq, IRes } from '@comp326-common/requests';

class FacultyController {
	private _facultyService = facultyService;

	public get facultyService() {
		return this._facultyService;
	}

	createFaculty = async (req: IReq, res: IRes, next: INext) => {
		try {
			
			const response = await facultyService.createFaculty(req.body);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	updateFaculty = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await facultyService.updateFaculty(
				req.params.id,
				req.body,
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	deleteFaculty = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await facultyService.deleteFaculty(req.params.id);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	getFacultyById = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await facultyService.getFacultyById(req.params.id);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	getFacultyByReg = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await facultyService.getFacultyByReg(
				req.params.reg,
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	getFacultys = async (req: IReq, res: IRes, next: INext) => {
		try {
			const limit = req.query.limit ? req.query.limit : 50;
			const page = req.query.limit ? req.page.limit : 1;
			const response = await facultyService.getFacultys(
				<number>(<unknown>limit),
				<number>(<unknown>page),
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	searchFaculty = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await facultyService.searchFaculty(
				req.query.q as unknown as string,
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};
}

export default new FacultyController();
