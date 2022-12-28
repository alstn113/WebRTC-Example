import styled from '@emotion/styled';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Spacer from '../Spacer/Spacer';
import Loader, { LoaderProps } from './Loader';

export default {
  title: 'Components/Loader',
  component: Loader,
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args: LoaderProps) => (
  <Container>
    <FlexRow>
      <Loader {...args} />
    </FlexRow>
  </Container>
);

export const Default = Template.bind({});

export const Bars = ({ size }: Pick<LoaderProps, 'size'>) => {
  return (
    <Container>
      <FlexRow>
        <Loader size={size} />
        <Loader color="error" size={size} />
        <Loader color="secondary" size={size} />
        <Loader color="success" size={size} />
        <Loader color="warning" size={size} />
      </FlexRow>
    </Container>
  );
};

export const Color = () => {
  return (
    <Container>
      <FlexRow>
        <Loader color="primary" />
        <Spacer />
        <Loader color="error" />
        <Spacer />
        <Loader color="secondary" />
        <Spacer />
        <Loader color="success" />
        <Spacer />
        <Loader color="warning" />
      </FlexRow>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  height: 100vh;
  padding: 3rem;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;
