/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@comp326-api';
import path from 'path';
import { baseDir, envConfig } from '@comp326-config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerAutogen = require('swagger-autogen')();

const doc = {
	info: {
		version: '1.0.0', // by default: '1.0.0'
		title: 'Exam cell', // by default: 'REST API'
		description: 'Dev', // by default: ''
	},
	host: `http://localhost:${envConfig.port}`, // by default: 'localhost:3000'
	basePath: '/api/v1', // by default: '/'
	schemes: ['http', 'https'], // by default: ['http']
	consumes: [], // by default: ['application/json']
	produces: [], // by default: ['application/json']
	tags: [
		// by default: empty Array
		{
			name: '', // Tag name
			description: '', // Tag description
		},
		// { ... }
	],
	securityDefinitions: {}, // by default: empty object
	definitions: {}, // by default: empty object (Swagger 2.0)
	components: {}, // by default: empty object (OpenAPI 3.x)
};

const outputFile = path.join(baseDir, 'src', 'docs', 'api-specs.json');
const endpointsFiles = [api.router];

swaggerAutogen(outputFile, endpointsFiles, doc)
	.then((re: any) => {
		console.log('Response ->', re);
		process.exit(0);
	})
	.catch((err: any) => {
		console.log('Error -> ', err);
		process.exit(0);
	});
