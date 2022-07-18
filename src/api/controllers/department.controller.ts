import departmentService from '../services/department.service';
import { INext, IReq, IRes } from '@comp326-common/requests';

class DepartmentController {
	private _departmentService = departmentService;

	public get departmentService() {
		return this._departmentService;
	}

	createDepartment = async (req: IReq, res: IRes, next: INext) => {
		try {
			
			const response = await departmentService.createDepartment(req.body);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	updateDepartment = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await departmentService.updateDepartment(
				req.params.id,
				req.body,
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	deleteDepartment = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await departmentService.deleteDepartment(req.params.id);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	getDepartmentById = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await departmentService.getDepartmentById(req.params.id);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	getDepartmentByReg = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await departmentService.getDepartmentByReg(
				req.params.reg,
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	getDepartments = async (req: IReq, res: IRes, next: INext) => {
		try {
			const limit = req.query.limit ? req.query.limit : 50;
			const page = req.query.limit ? req.page.limit : 1;
			const response = await departmentService.getDepartments(
				<number>(<unknown>limit),
				<number>(<unknown>page),
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	searchDepartment = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await departmentService.searchDepartment(
				req.query.q as unknown as string,
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};
}

export default new DepartmentController();
