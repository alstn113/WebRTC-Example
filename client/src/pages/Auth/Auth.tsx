import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Auth = () => {
  const navaigate = useNavigate();
  const [access_token] = useSearchParams();
  const accessToken = access_token.get('access_token');

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
      navaigate('/');
    }
  }, []);

  return <></>;
};

export default Auth;
