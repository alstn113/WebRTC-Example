import * as S from './ErrorMessage.styles';

export interface Props {
  children: React.ReactNode;
}

const ErrorMessage = ({ children }: Props) => {
  return <S.Root>{children}</S.Root>;
};

export default ErrorMessage;
