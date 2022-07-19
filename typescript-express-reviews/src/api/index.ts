import express from 'express';
import register from './User/register';
import login from './User/login';
import create from './Review/create';

const port = process.env.PORT || 3000;

void async function main() {
  const app = express();

  app.get('/status', function(req: express.Request, res: express.Response) {
    res.json({ ok: 1 });
  });

  app.use('/register', register);
  app.use('/login', login);
  app.use('/review/create', create);

  await app.listen(port);
  console.log('Listening on port ' + port);
}();