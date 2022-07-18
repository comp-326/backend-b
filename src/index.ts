import AppServer from './server';
import { envConfig } from './config';

const app = new AppServer();

app.start(envConfig.port);