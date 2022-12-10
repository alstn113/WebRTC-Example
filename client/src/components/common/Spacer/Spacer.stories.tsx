import styled from '@emotion/styled';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Spacer, { SpacerProps } from './Spacer';

export default {
  title: 'Layout/Spacer',
  component: Spacer,
} as ComponentMeta<typeof Spacer>;

const Template: ComponentStory<typeof Spacer> = (args: SpacerProps) => {
  return (
    <Container>
      <FlexColumn>
        <Box />
        <Spacer {...args} />
        <Box />
      </FlexColumn>
      <FlexRow>
        <Box />
        <Spacer {...args} />
        <Box />
      </FlexRow>
    </Container>
  );
};

const Box = styled.div`
  background: #f31260;
  width: 100px;
  height: 100px;
`;

const Container = styled.div`
  margin-top: 1rem;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Default = Template.bind({});

Default.args = {};
