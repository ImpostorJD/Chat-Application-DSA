import ChatBubble from "./ChatBubble";
import { useState } from "react";

/* eslint-disable react/prop-types */
export default function Chatbox({user, messages, sendMessage}) {
    const [message, setMessage] = useState(''); 
    return(
        <div className="w-[90%] h-[90%] rounded-sm relative  border-[1px]  border-secondary-color shadow-md shadow-secondary-color
        lg:w-[70%] lg:h-[70%]
        md:w-[80%] md:h-[80%]">
            <div className="px-4 py-2 h-[10%] bg-secondary-color flex items-center">
                <p className="text-accent font-bold">
                    Chat Room
                </p>
            </div>
            <div className="h-[70%] lg:h-[75%] overflow-y-auto overflow-x-hidden px-3"> 
                {
                    messages.map((message, i) => {
                        const keys = Object.keys(message);
                        //{"Daniel": "Hi from daniel's client"}
                        //["Daniel"]
                    
                        const sender = keys[0] == user ? "SELF" : keys[0] == "Server" ? "SERVER" : "OTHER";
                        // sender = "SELF"
                        // sender = "SERVER"
                        // sender = "OTHER"

                        const messageActual = message[keys[0]];
                        //"Hi from daniel's client"
                         
                        return <ChatBubble sender={sender} name={keys[0]} message={messageActual} key={i}/>
                    })
                }
            </div>
            <div className="h-[20%] lg:h-[15%] p-4 border-t-secondary-color border-t-[1px]">
                <div className="w-full h-[100%] border border-primary-color rounded flex gap-3 items-center">
                    <textarea
                        value={message} onChange={(e) => setMessage(e.target.value)}
                        className="w-[80%] p-3 h-[100%] overflow-auto border-[1px] border-secondary-color rounded-md"
                        placeholder="Type your message here"
                    ></textarea>
                    <button className="flex-auto h-max bg-accent text-primary-color p-2  justify-center items-center rounded-md flex gap-2" onClick={()=>{
                            sendMessage(message)
                            setMessage('')
                        }}>
                        <i className="bi bi-send"></i>
                        <span className="lg:block hidden">
                            Send Message
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}