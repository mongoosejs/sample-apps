import express from 'express';

const port = process.env.PORT || 3000;

void async function main() {
  const app = express();

  app.get('/status', function(req: express.Request, res: express.Response) {
    res.json({ ok: 1 });
  });

  await app.listen(port);
  console.log('Listening on port ' + port);
}();
