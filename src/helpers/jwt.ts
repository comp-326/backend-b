import { envConfig } from '@comp326-config';
import jwt from 'jsonwebtoken';

export type JwtPayload = {
    userId: string;
    email: string;
	staff:string
};

export class Jwt {
	public static generateToken(user: JwtPayload): string {
		return jwt.sign(user, envConfig.secretKey, { expiresIn: '270h' });
	}

	public static verifyToken(token: string): JwtPayload {
		return jwt.verify(token, envConfig.secretKey) as JwtPayload;
	}
}