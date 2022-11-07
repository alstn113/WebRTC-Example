export default () => ({
  server: {
    port: parseInt(process.env.SERVER_PORT, 10) || 8080,
  },
  client: process.env.CLIENT || 'http://localhost:3000',
  auth: {
    jwt_token: process.env.JWT_TOKEN,
    github: {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      callback_url: process.env.CALLBACK_URL,
    },
  },
});
