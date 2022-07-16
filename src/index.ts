import AppServer from './server';
import { envConfig } from '@comp326-config';

const app = new AppServer();

app.start(envConfig.port);