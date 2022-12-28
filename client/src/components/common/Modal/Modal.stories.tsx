import useDisclosure from '~/hooks/useDisclosure';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '~/components/common';
import Modal, { ModalProps } from './Modal';

export default {
  title: 'Components/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args: ModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button onClick={onOpen}>Modal Open</Button>
      <Modal {...args} visible={isOpen} onCancel={onClose} onConfirm={onClose} />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = { title: 'This is Modal', message: 'This is Message' };
