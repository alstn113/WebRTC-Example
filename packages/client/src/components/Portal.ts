import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  id: string;
}

const Portal = ({ children, id }: PortalProps) => {
  const isSSR = (): boolean => {
    return typeof window === 'undefined' || typeof document === 'undefined';
  };

  const element = isSSR() ? null : (document.getElementById(id) as HTMLElement);

  if (!element) return null;
  return createPortal(children, element);
};

export default Portal;
