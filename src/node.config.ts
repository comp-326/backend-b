import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const config = {
	baseDir: path.dirname(__dirname),
	env: {
		port: <number>(<unknown>process.env.PORT) || 4200,
		host: process.env.HOST || 'localhost',
	},
	mongo: {
		url: process.env.MONGO_URL || 'mongodb://localhost/examcell-2',
	},
};

export default config;
