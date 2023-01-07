import { Link } from 'react-router-dom';
import * as S from './Header.styles';

const Header = () => {
  return (
    <S.Container>
      <Link to={'/'}>WebRTC-app</Link>
    </S.Container>
  );
};

export default Header;
