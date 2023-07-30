import { useContext, useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { JwtTokenContext } from './_app';


const ChatPage = () => {
  const [msg, setMsg] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket>(null);
  const { jwtToken } = useContext(JwtTokenContext);

  useEffect(
    () => {connectSocket();}, 
  [jwtToken]);
  
  const messageInput = useRef(null);

  const connectSocket = async () => {
    if(socket?.connected) return;
    console.log('token: ', jwtToken);

    const newSocket = io('ws://localhost:3131', {
      extraHeaders: {
        Authorization: `Bearer ${jwtToken}`,
      }
    });

    newSocket.on('connected', () => {
        console.log('connected');
    });

    newSocket.on('message', onNewMessage);

    setSocket(newSocket);
  }

  const isSocketUp = () : boolean => {
    return socket.active;
  }

  const onNewMessage = (message: string) => {
    console.log('Received message:', message);

    console.log('now: ', msg);
    console.log('mergerd:', [...msg, message]);
    setMsg(prevMsg => [...prevMsg, message]);
  };

  const sendMessage = (text: string) => {
    socket.emit('message', text);
  };

  const disconnectSocket = () => {
    socket.disconnect();
  };



  const sendButtonHandler = () => {
    const text = messageInput.current.value;
    messageInput.current.value = '';

    sendMessage(text);
  };

  return (
    <div>
    <div>
    incoming messages: 
    {
      msg.map((text) => {
        return(
          <div key={text}>{text}</div>
          )
        })
      }
    </div> 
    <div>
      <input type='text' ref={messageInput}/>
      <button onClick={sendButtonHandler}>send message</button>
    </div>
    </div>
      
  );
};

export default ChatPage;
