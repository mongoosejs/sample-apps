import express from 'express';
import register from './User/register';
import login from './User/login';
import create from './Review/create';
import last5 from './Vehicle/findById';
import findByVehicle from './Review/findByVehicle';
import bodyParser from 'body-parser';
import connect from '../models/connect';

const port = process.env.PORT || 3000;

void async function main() {
  const app = express();

  await connect();

  app.use(bodyParser.json());
  app.get('/status', function(req: express.Request, res: express.Response) {
    res.json({ ok: 1 });
  });

  app.use('/register', register);
  app.use('/login', login);
  app.use('/review/create', create);
  app.use('/vehicle/recent/reviews', last5);
  app.use('/vehicle/reviews', findByVehicle);

  await app.listen(port);
  console.log('Listening on port ' + port);
}();
