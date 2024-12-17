import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');
  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log('Connection established');
      setSocket(newSocket);
      newSocket.send('Hello Server!');
    };
    newSocket.onmessage = (message) => {
      console.log('Message received:', message.data);
      setMessages((prev) => [...prev, message.data]);
    };
    return () => newSocket.close();
  }, []);

  return (
    <div>
      <div>
        <input
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type='submit'
          onClick={() => {
            socket?.send(newMessage);
            setNewMessage('');
          }}
        >
          sumbit
        </button>
      </div>
      <div>
        {messages.map((message) => (
          <div>{message}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
