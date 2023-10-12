import './App.css';
import Chatbox from './chat_proper/Chatbox';
import UserRegister from './chat_proper/UserRegister';
import { useEffect, useState } from "react";
import SockJS from 'sockjs-client/dist/sockjs';
import Stomp from 'stompjs';

function App() {
  const [connectedUser, setConnectedUser] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const [registrationResponse, setRegistrationResponse] = useState(null);
  const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!stompClient) {
            connectToWebSocket();
        }
        // Cleanup on component unmount
        return () => {
            if (stompClient) {
                stompClient.disconnect(() => {
                    console.log('Stomp client disconnected');
                });
            }
        }
    }, [stompClient]);

    const connectToWebSocket = () => {
        let Sock = new SockJS('http://192.168.1.15:8080/ws');
        const client = Stomp.over(Sock);
        client.connect({},  () => {
            setStompClient(client);
            onConnected(client);
        }, onError);
    }

    const onConnected = (client) => {
        client.subscribe('/topic/messages', onMessageReceived);
        client.subscribe('/user/topic/registration-status', onRegister);
    }

    const onMessageReceived = (payload) => {
      const messageData = JSON.parse(payload.body);

      setMessages((prevMessages) => [...prevMessages, messageData]);
    }

    const onRegister = (payload) => {
      const payloadData = JSON.parse(payload.body);
      console.log(payloadData);
      const keys = Object.keys(payloadData);
      const key = keys[0];
      const message = payloadData[key]; 
      if (key == "Success") {
        setConnectedUser(message);
      }
  
      setRegistrationResponse(payloadData);
    };

  

    const onError = (err) => {
        console.log(err);
    }

    const registerUser = (username) => {

      const trimmedUsername = username.trim();

      if (trimmedUsername.length > 0) {
        if (stompClient) {
      
          stompClient.send("/app/register-user", {}, JSON.stringify({ "username": trimmedUsername })); 
        }
      }
    }
    const sendMessage = (message) => {
      const checkMessage = message.trim();
      if (checkMessage.length > 0) {
         if (stompClient) {
             stompClient.send("/app/chat", {}, JSON.stringify({ "message": message }));
         }
      }
    }

  return (
    <>
      <div className="bg-primary-color w-full h-[100vh] flex justify-center items-center">
        { connectedUser != null ? 
          <Chatbox user = {connectedUser} messages={messages} sendMessage={sendMessage}/>
        : <UserRegister registrationResponse = {registrationResponse} registerUser = {registerUser}/>
        }
      </div>
    </>
  )
}

export default App;
