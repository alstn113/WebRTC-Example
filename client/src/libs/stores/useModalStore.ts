import produce from 'immer';
import create from 'zustand';

interface ModalConfig {
  title: string;
  message: string;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm: () => void;
}

type States = {
  visible: boolean;
  config: ModalConfig | null;
};

type Actions = {
  close: () => void;
  open: (config: ModalConfig) => void;
};

const useModalStore = create<States & Actions>((set) => ({
  visible: false,
  config: null,
  close: () =>
    set(
      produce((states: States) => {
        states.visible = false;
      }),
    ),
  open: (config) =>
    set(
      produce((states: States) => {
        states.visible = true;
        states.config = config;
      }),
    ),
}));

export default useModalStore;
