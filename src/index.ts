import AppServer from '@comp326-server';
import { envConfig } from '@comp326-config';

const app = new AppServer();

app.start(envConfig.port);