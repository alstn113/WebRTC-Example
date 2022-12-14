import { useCallback } from 'react';
import useModalStore from '~/lib/stores/useModalStore';
import Modal from '~/components/common/Modal/Modal';

const ModalProvider = () => {
  const { config, close, visible } = useModalStore();

  const onCacel = useCallback(() => {
    config?.onCancel?.();
    close();
  }, [config, close]);

  const onConfirm = useCallback(() => {
    config?.onConfirm();
    close();
  }, [config, close]);

  return (
    <Modal
      title={config?.title || ''}
      message={config?.message || ''}
      cancelText={config?.cancelText}
      confirmText={config?.confirmText}
      visible={visible}
      onCancel={onCacel}
      onConfirm={onConfirm}
    />
  );
};

export default ModalProvider;
