import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { EVENT } from '~/constants';
import roomSocket from '~/lib/sockets/roomSocket';

interface Props {
  roomId: string;
}

const Chat = ({ roomId }: Props) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');
  const chatListRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    roomSocket.socket?.on(EVENT.CHAT_MESSAGE, (data) => {
      setMessages([...messages, data]);
    });
    chatListRef.current?.scrollTo(0, chatListRef.current.scrollHeight);
  }, [messages]);

  const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    roomSocket.socket?.emit(EVENT.CHAT_MESSAGE, { roomId, message: messageInput });
    setMessageInput('');
  };
  return (
    <ChatWrapper>
      <Title>Chat</Title>
      <ChatList ref={chatListRef}>
        {messages.map((message) => (
          <div key={crypto.randomUUID()}>{message}</div>
        ))}
      </ChatList>
      <ChatForm onSubmit={handleSubmitMessage}>
        <ChatInput
          placeholder="Write Message..."
          onChange={(e) => setMessageInput(e.target.value)}
          value={messageInput}
        />
      </ChatForm>
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
  font-size: 18px;
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

const ChatForm = styled.form`
  width: 100%;
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
  font-size: 18px;
`;
