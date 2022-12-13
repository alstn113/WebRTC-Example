import Portal from '~/components/Portal';

interface ModalProps {
  visible: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cacelText?: string;
}

const Modal = ({
  visible,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cacelText = 'Cancel ',
}: ModalProps) => {
  return <Portal id="modal">late</Portal>;
};

export default Modal;
