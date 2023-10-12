/* eslint-disable no-unused-vars */

import Avatar from "./Avatar";

/* eslint-disable react/prop-types */
export default function ChatBubble({sender, name, message}){

    return ( 
        <div className={`w-full min-h-[50px] flex items-center gap-3 ${sender === "SELF" ? "justify-end" : sender === "SERVER" ? "justify-center" : "justify-start"}`}>
            {
                sender === "SELF" ?
                <>
                    <div className="flex flex-col gap-1 h-full items-end">
                        <h1 className="text-slate-600">{name}</h1>
                        <div className="p-3 rounded-lg bg-accent text-secondary-color text-end">
                            {message}
                        </div>
                    </div>
                    <Avatar name ={name}/>
                </>
                :  sender === "SERVER" ?
                    <div className="text-center text-slate-600">
                        { message }
                    </div>  
                : <>
                    <Avatar name ={name}/>
                    <div className="flex flex-col gap-1 items-start">
                        <h1 className="text-slate-600">{name}</h1>
                        <div className="p-3 rounded-lg bg-secondary-color text-accent">
                            {message}
                        </div>
                    </div>
                    
                </>
            }
           
        </div>
    );
  
}