import { useCallback, useState } from 'react';

interface useDisclosureProps {
  defaultIsOpen?: boolean;
}

const useDisclosure = ({ defaultIsOpen = false }: useDisclosureProps = {}) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultIsOpen);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onToggle = useCallback(() => {
    const action = isOpen ? onClose : onOpen;
    action();
  }, [isOpen, onClose, onOpen]);

  return { isOpen, onOpen, onClose, onToggle };
};

export default useDisclosure;
