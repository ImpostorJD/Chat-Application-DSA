/* eslint-disable react/prop-types */
import bg_image from '../assets/animal-crossing.jpg';
import { useState } from "react";

export default function UserRegister({registrationResponse, registerUser}){
  const [username, setUsername] = useState(''); 

  let keys;
  let key;
  let message;
  if(registrationResponse != null){
    keys = Object.keys(registrationResponse);
    key = keys[0];
    message = registrationResponse[key]; 
  }
  
    return (
        <div className="w-[90%] h-[70%] rounded-sm relative  border-[1px]  border-secondary-color shadow-md shadow-secondary-color
        lg:w-[20%] lg:h-[50%]
        md:w-[60%] md:h-[60%]">
          <img src={bg_image} className='w-full h-full absolute'/>
          <div className='bg-primary-variant w-full h-full p-5 bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-50 lg:p-6 md:p-10 flex flex-col gap-10 justify-center items-center'>
            <h1 className='font-bold text-center w-full text-accent'>
              Please Enter Your Name:
            </h1>
            <div className='flex flex-col gap-1 w-full'>
              <input type="text" className="border-[1px] rounded-lg w-full p-2" name='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
              {
                registrationResponse != null ? 
                key == "Fail" ? <span className='text-red-500'>{message}</span> : <></>
                : <></>
              }
            </div>
            <button className="w-full border-[1px] border-accent rounded-md bg-secondary-color p-2 shadow-md text-accent transition-all hover:border-secondary-color hover:shadow-secondary-color hover:bg-accent hover:text-secondary-color" onClick={() => registerUser(username)}>Submit</button>
          </div>
          
        </div>
    )
}
