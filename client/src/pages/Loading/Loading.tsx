import Loader from '../../components/common/Loader/Loader';
import * as S from './Loading.styles';

const Loading = () => {
  return (
    <S.Container>
      <Loader size="lg" color="success" />
    </S.Container>
  );
};

export default Loading;
