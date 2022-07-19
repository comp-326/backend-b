import { ExpressError } from '@comp326-common/errors/ExpressError';
import { JwtPayload } from '@comp326-helpers/jwt';
import { envConfig } from '@comp326-config';
import jwt from 'jsonwebtoken';
import { INext, IReq, IRes } from '@comp326-common/requests';

class AuthMiddleware {
	public static loginRequired = async (req: IReq, res: IRes, next: INext) => {
		try {
			const authorization = req.headers.authorization;
			if (!authorization) {
				return next(
					new ExpressError({
						message: 'Authorization header is required',
						status: 'error',
						statusCode: 401,
						data: {},
					}),
				);
			}
			const token = authorization.split(' ')[1];
			if (!token) {
				return next(
					new ExpressError({
						message: 'Invalid access token',
						status: 'error',
						statusCode: 401,
						data: {},
					}),
				);
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			jwt.verify(token, envConfig.secretKey, (err: any, decoded: any) => {
				if (err) {
					return next(
						new ExpressError({
							message: 'Invalid access token',
							status: 'error',
							statusCode: 401,
							data: {},
						}),
					);
				}
				req.user = decoded as JwtPayload;
				next();
			});
		} catch (err) {
			return next(err);
		}
	};
}

export const { loginRequired } = AuthMiddleware;