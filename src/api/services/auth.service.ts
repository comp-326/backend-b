/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import ADO from '@comp326-api/dao/Auth.dao';
import { ExpressError } from '@comp326-common/errors/ExpressError';
import { Jwt } from '@comp326-helpers/jwt';

class CourseService {
	private _loginDao = ADO;

	protected get loginDao() {
		return this._loginDao;
	}


	login = async (id: string, password: string) => {
		if (!id) {
			throw new ExpressError({
				message: 'User id required',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		} if (!password) {
			throw new ExpressError({
				message: 'User id required',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		const res = await this.loginDao.loginUser(id, password) as unknown as any;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password: _, ...props } = res._doc;
		const accessToken = Jwt.generateToken({
			userId: props._id,
			staff: props.staff,
			email: props.email
		});

		return { user: props, accessToken };

	};

}

export default new CourseService();
