import courseService from '../services/course.service';
import { INext, IReq, IRes } from '@comp326-common/requests';

class CourseController {
	private _courseService = courseService;

	public get courseService() {
		return this._courseService;
	}

	createCourse = async (req: IReq, res: IRes, next: INext) => {
		try {
			
			const response = await courseService.createCourse(req.body);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	updateCourse = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await courseService.updateCourse(
				req.params.id,
				req.body,
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	deleteCourse = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await courseService.deleteCourse(req.params.id);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	getCourseById = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await courseService.getCourseById(req.params.id);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	getCourseByReg = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await courseService.getCourseByReg(
				req.params.reg,
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	getCourses = async (req: IReq, res: IRes, next: INext) => {
		try {
			const limit = req.query.limit ? req.query.limit : 50;
			const page = req.query.limit ? req.page.limit : 1;
			const response = await courseService.getCourses(
				<number>(<unknown>limit),
				<number>(<unknown>page),
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	searchCourse = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await courseService.searchCourse(
				req.query.q as unknown as string,
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};
}

export default new CourseController();
