const Home = () => {
  const handleGithubLogin = () => {
    window.location.href = 'http://localhost:8080/auth/github';
  };
  return (
    <div>
      Home <button onClick={handleGithubLogin}>sdf</button>
    </div>
  );
};

export default Home;
