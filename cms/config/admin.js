module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'sonora-admin-jwt-secret-2026-strong-key'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'sonora-api-token-salt-2026-strong-key'),
  },
});
