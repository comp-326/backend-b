import authService from '../services/auth.service';
import { INext, IReq, IRes } from '@comp326-common/requests';

class AuthController {
	private _authService = authService;

	public get courseService() {
		return this._authService;
	}


	login = async (req: IReq, res: IRes, next: INext) => {
		try {
			const response = await authService.login(
				req.body.id, req.body.password
			);

			return res.status(200).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};


}

export default new AuthController();
