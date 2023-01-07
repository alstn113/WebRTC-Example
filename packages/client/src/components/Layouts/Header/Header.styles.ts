import styled from '@emotion/styled';
import { palette } from '~/libs/styles/palette';
import zIndexes from '~/libs/styles/zIndexes';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 60px;
  padding: 0 16px;
  z-index: ${zIndexes.Header};
  color: ${palette.white};
  background-color: ${palette.black};
  border-radius: 0 0 16px 16px;
`;

export const Title = styled.div`
  font-size: 30px;
  font-weight: 900;
  text-shadow: 0 2px 4px white;
`;

export const HeaderSide = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  ${({ position }) => position} : 16px;
  height: 100%;
`;
