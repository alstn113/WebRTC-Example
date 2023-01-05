import styled from '@emotion/styled';

interface Props {
  roomId: string;
}

const Chat = ({ roomId }: Props) => {
  return (
    <ChatWrapper>
      <Title>Chat</Title>
      <ChatList></ChatList>
      <ChatInput placeholder="Write Message..." />
    </ChatWrapper>
  );
};

export default Chat;

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 300px;
  width: 300px;
  border: 1px solid black;
  margin-left: 1rem;
`;

const Title = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  padding: 5px 0;
  height: 40px;
  width: 100%;
  text-align: center;
  background-color: #000;
  color: #fff;
`;

const ChatList = styled.div`
  height: 220px;
  width: 100%;
  overflow-y: auto;
`;

const ChatInput = styled.input`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #000;
  color: #fff;
  height: 40px;
  width: 100%;
  padding: 0 20px;
  font-size: 20px;
`;
