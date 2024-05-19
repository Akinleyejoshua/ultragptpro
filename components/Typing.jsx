import React from "react"; 
import Typewriter from 'typewriter-effect'; 
  
export default function TypingEffect({text}) { 
  return ( 
    <div> 
      <Typewriter 
        onInit={(typewriter) => { 
          typewriter.typeString(text) 
            .callFunction(() => { 
              console.log('String typed out!'); 
            }) 
            .changeDelay(1)
            
            .start(); 
            
        }} 
      /> 
    </div> 
  ); 
}