import { NormalColorType } from '../../../libs/styles/palette';
import * as S from './Loader.styles';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  color?: NormalColorType;
}

const Loader = ({ size = 'md', color = 'primary' }: Props) => {
  return (
    <S.Container size={size}>
      {[0, 0.1, 0.2, 0.3, 0.4].map((number) => (
        <S.Bar key={number} color={color} delay={number} />
      ))}
    </S.Container>
  );
};

export default Loader;
