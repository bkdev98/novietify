import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import reactViews from 'express-react-views';
import express from 'express';

const isProd = process.env.NODE_ENV === 'prod';

export default app => {
  if (isProd) {
    app.use(compression());
    app.use(helmet());
  }

  app.engine('js', reactViews.createEngine());

  app.use('/public', express.static('public'));

  app.use(morgan('tiny'));
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
};
