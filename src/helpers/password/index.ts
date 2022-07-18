import bcrypt from 'bcryptjs';

export class Password {
	static hash = async (passwordText: string, passwordSaltLength = 10) => {
		const salt = await bcrypt.genSalt(passwordSaltLength);

		return await bcrypt.hash(passwordText, salt);
	};

	static chechPasswordMatch = async (
		passwordText: string,
		passwordHash: string,
	) => {
		return await bcrypt.compare(passwordText, passwordHash);
	};
}
