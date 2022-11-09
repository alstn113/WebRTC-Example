export default () => ({
  server: {
    port: parseInt(process.env.SERVER_PORT, 10) || 8080,
  },
  client: process.env.CLIENT || 'http://localhost:3000',
  auth: {
    // jwt
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
    access_token_expire: process.env.ACCESS_TOKEN_EXPIRE || '1h',
    refresh_token_expire: process.env.REFRESH_TOKEN_EXPIRE || '30d',

    // oauth
    github: {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      callback_url: process.env.CALLBACK_URL,
    },
  },
});
