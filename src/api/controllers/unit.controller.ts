import unitService from '../services/unit.service';
import { INext, IReq, IRes } from '@comp326-common/requests';

class UnitController {
	private _unitService = unitService;

	public get unitService() {
		return this._unitService;
	}

	createUnit = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await unitService.createUnit(req.body);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	updateUnit = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await unitService.updateUnit(
				req.params.id,
				req.body,
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	deleteUnit = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await unitService.deleteUnit(req.params.id);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	getUnitById = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await unitService.getUnitById(req.params.id);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	getDepartmentUnits = async (req: IReq, res: IRes, next: INext) => {
		try {
			const year = req.query.year
				? parseInt(req.query.year as string)
				: 1;
			const semester = req.query.semester
				? parseInt(req.query.semester as string)
				: 1;
			const response = await unitService.getDepartmentCourses(
				req.params.department,
				year,
				semester,
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	getUnitByReg = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await unitService.getUnitByReg(req.params.reg);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	getUnits = async (req: IReq, res: IRes, next: INext) => {
		try {
			const limit = req.query.limit ? req.query.limit : 50;
			const page = req.query.limit ? req.page.limit : 1;
			const response = await unitService.getUnits(
				<number>(<unknown>limit),
				<number>(<unknown>page),
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	searchUnit = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await unitService.searchUnit(
				req.query.q as unknown as string,
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};
}

export default new UnitController();
