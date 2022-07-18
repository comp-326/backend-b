import sessionUnitService from '../services/sessionUnit.service';
import { INext, IReq, IRes } from '@comp326-common/requests';

class SessionUnitController {
	private _sessionUnitService = sessionUnitService;

	public get sessionUnitService() {
		return this._sessionUnitService;
	}

	createSessionUnit = async (req: IReq, res: IRes, next: INext) => {
		try {
			
			const response = await sessionUnitService.createSessionUnit(req.body);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	updateSessionUnit = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await sessionUnitService.updateSessionUnit(
				req.params.id,
				req.body,
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	deleteSessionUnit = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await sessionUnitService.deleteSessionUnit(req.params.id);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	getSessionUnitById = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await sessionUnitService.getSessionUnitById(req.params.id);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	getSessionUnitByReg = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await sessionUnitService.getSessionUnitByReg(
				req.params.reg,
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	getSessionUnits = async (req: IReq, res: IRes, next: INext) => {
		try {
			const limit = req.query.limit ? req.query.limit : 50;
			const page = req.query.limit ? req.page.limit : 1;
			const response = await sessionUnitService.getSessionUnits(
				<number>(<unknown>limit),
				<number>(<unknown>page),
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	searchSessionUnit = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await sessionUnitService.searchSessionUnit(
				req.query.q as unknown as string,
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};
}

export default new SessionUnitController();
