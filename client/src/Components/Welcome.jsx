import React from "react";

export default function Welcome(){

    return(
        <div>
            <button type='button' onClick={()=>{
                window.location.replace('/home')
            }}>Welcome</button>
        </div>
    )
}