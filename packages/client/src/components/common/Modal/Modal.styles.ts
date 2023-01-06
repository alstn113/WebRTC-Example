import mediaQuery from '~/libs/styles/mediaQuery';
import zIndexes from '~/libs/styles/zIndexes';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: ${zIndexes.Modal};
`;

export const Positioner = styled.div`
  position: fixed;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: ${zIndexes.Modal};
`;

export const ModalBlock = styled(motion.div)`
  background: white;
  width: 25rem;
  background: white;
  padding: 1.5rem;
  border-radius: 14px;
  box-shadow: rgb(0 0 0 / 9%) 0px 2px 12px 0px;
  ${mediaQuery.sm} {
    width: 18rem;
  }
`;

export const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 8px;
  font-size: 2rem;
  ${mediaQuery.sm} {
    font-size: 1.5rem;
  }
  line-height: 1.5;
  font-weight: 700;
`;
export const Message = styled.p`
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const Footer = styled.section`
  display: flex;
  gap: 10px;
  margin-top: 2rem;
  justify-content: flex-end;
`;
