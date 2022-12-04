import { NormalColorType } from '~/libs/styles/palette';
import { ButtonHTMLAttributes } from 'react';
import * as S from './Button.styles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg' | 'auto';
  children: React.ReactNode;
  color?: NormalColorType;
  shadow?: boolean;
}

const Button = ({
  size = 'md',
  color = 'primary',
  children,
  shadow = false,
  ...options
}: ButtonProps) => {
  return (
    <S.Container size={size} color={color} shadow={shadow} {...options}>
      {children}
    </S.Container>
  );
};

export default Button;
