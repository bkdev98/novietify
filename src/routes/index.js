import { renderHomePage, submitForm, cancel } from '../controllers';

export default app => {
  app.get('/', renderHomePage);
  app.get('/cancel/:id', cancel);
  app.post('/', submitForm);
};
