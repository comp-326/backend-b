import { BaseRouter } from '@comp326-common/routes/baseRouter';
import authController from '@comp326-api/controllers/auth.controller';

class AuthRouter extends BaseRouter {
	route() {
		this.router.post('/login', authController.login);

		return this.router;
	}
}

export default new AuthRouter().route();
