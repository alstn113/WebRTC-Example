import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { Button } from '~/components/common';
import lobbySocket from '~/libs/sockets/lobbySocket';

const Lobby = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');
  const chatListRef = useRef<HTMLDivElement>(null);

  const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    lobbySocket.sendMessage({ message: messageInput });
    setMessageInput('');
  };

  useEffect(() => {
    lobbySocket.initLobbySocket();

    return () => {
      lobbySocket.leaveLobby();
    };
  }, []);

  useEffect(() => {
    lobbySocket.receiveMessage({ done: (message: string) => setMessages([...messages, message]) });
    chatListRef.current?.scrollTo(0, chatListRef.current.scrollHeight);
  }, [messages]);

  return (
    <Container>
      <ContentsWrapper>
        <ChatContainer ref={chatListRef}>
          {messages.map((message) => {
            return <div key={crypto.randomUUID()}>{message}</div>;
          })}
        </ChatContainer>
        <OnlineUserContainer>온라인</OnlineUserContainer>
      </ContentsWrapper>
      <ChatForm onSubmit={handleSubmitMessage}>
        <ChatInput
          placeholder="Write Message..."
          onChange={(e) => setMessageInput(e.target.value)}
          value={messageInput}
        />
        <Button type="submit" shadow color="secondary">
          Send
        </Button>
      </ChatForm>
    </Container>
  );
};

const ChatForm = styled.form`
  margin-top: 20px;
  width: 800px;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding-right: 1rem;
`;
const ChatInput = styled.input`
  width: 100%;
  height: 40px;
  margin: 0 1rem;
  font-size: 1rem;
  border-bottom: 2px solid rgba(0, 0, 0, 0.8);
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  width: 590px;
  height: 100%;
`;
const OnlineUserContainer = styled.div`
  width: 190px;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 2rem;
`;

const ContentsWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 800px;
  height: 400px;
`;

export default Lobby;
