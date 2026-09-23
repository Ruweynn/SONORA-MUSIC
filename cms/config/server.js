module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS', [
      'sonoraAppKeyA-2026',
      'sonoraAppKeyB-2026',
      'sonoraAppKeyC-2026',
      'sonoraAppKeyD-2026',
    ]),
  },
  proxy: true,
  cron: {
    enabled: false,
  },
  cors: {
    enabled: true,
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:1337', 'http://127.0.0.1:1337'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    headers: ['Content-Type', 'Authorization', 'Content-Disposition'],
  },
});
