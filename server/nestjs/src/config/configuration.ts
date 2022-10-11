export default () => ({
  server: {
    port: parseInt(process.env.SERVER_PORT, 10) || 8080,
  },
  client: process.env.CLIENT || 'http://localhost:3000',
});
