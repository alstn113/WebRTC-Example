export default () => ({
  github: {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    callback_url: process.env.CALLBACK_URL,
  },
  kakao: {
    client_id: process.env.KAKAO_CLIENT_ID,
    callback_url: process.env.CALLBACK_URL,
  },
});
