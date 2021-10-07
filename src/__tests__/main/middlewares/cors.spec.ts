import request from 'supertest';

import app from 'main/config/app';

describe('CORS Middleware', () => {
  it('should enable CORS', async () => {
    app.get('/test_cors', (req, res) => {
      res.send();
    });

    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*.kontrola.app')
      .expect('access-control-allow-headers', '*')
      .expect('access-control-allow-methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  });
});
