import express from 'express';
import constants from './config/constants';
import configMiddleware from './config/middlewares';
import './config/database';
import routesConfig from './routes';
import { checkBookingStatus } from './utils/api';

checkBookingStatus();
setInterval(checkBookingStatus, 300000);

const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'js');

configMiddleware(app);

routesConfig(app);

app.listen(constants.PORT, () => {
  console.log(`
      ███╗   ██╗ ██████╗ ██╗   ██╗██╗███████╗████████╗██╗███████╗██╗   ██╗
      ████╗  ██║██╔═══██╗██║   ██║██║██╔════╝╚══██╔══╝██║██╔════╝╚██╗ ██╔╝
      ██╔██╗ ██║██║   ██║██║   ██║██║█████╗     ██║   ██║█████╗   ╚████╔╝
      ██║╚██╗██║██║   ██║╚██╗ ██╔╝██║██╔══╝     ██║   ██║██╔══╝    ╚██╔╝
      ██║ ╚████║╚██████╔╝ ╚████╔╝ ██║███████╗   ██║   ██║██║        ██║
      ╚═╝  ╚═══╝ ╚═════╝   ╚═══╝  ╚═╝╚══════╝   ╚═╝   ╚═╝╚═╝        ╚═╝
    `);
  console.log(`
      HOST:       ${constants.HOSTNAME}
      PORT:       ${constants.PORT}
      ENV:        ${process.env.NODE_ENV}`);
});

process.on('SIGINT', () => {
  console.log('Bye bye!');
  process.exit();
});
