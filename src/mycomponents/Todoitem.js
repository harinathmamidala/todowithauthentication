import React, { useEffect } from 'react'
import { useState } from 'react'
import { doc, updateDoc } from "firebase/firestore";
import {db} from './Firebase'



// Set the "capital" field of the city 'DC'


export default function Todoitem({obj,onDelete}) {
  const [toggle,setToggle]=useState(false)

  useEffect(
    ()=>{
    const Ref = doc(db, "todos", `${obj.id}`);
    updateDoc(Ref, {
     isCompleted:toggle
    });
  },[toggle,obj.id])
  
  
  

  return (
    <div>
      
      <ul>
        <li className={toggle?"checked":null} onClick={()=>{setToggle(!toggle)}}>{obj.todo}<span className='close' onClick={()=>onDelete(obj)}>&#215;</span>
        </li>
      </ul>
              
    </div>
  )
}
