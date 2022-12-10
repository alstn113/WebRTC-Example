import * as S from './Spacer.styles';

export interface SpacerProps {
  x?: number;
  y?: number;
}

const Spacer = ({ x = 1, y = 1 }: SpacerProps) => {
  return <S.Root x={x} y={y} />;
};

export default Spacer;
