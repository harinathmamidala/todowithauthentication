import React, { useEffect } from 'react'
import { useState } from 'react'
import { doc, updateDoc } from "firebase/firestore";
import {db} from './Firebase'



// Set the "capital" field of the city 'DC'


export default function Todoitem({obj,onDelete,filename}) {

  const [toggle,setToggle]=useState(obj.isCompleted)
  useEffect(()=>{
    console.log(obj.id)
    const Ref = doc(db,filename,`${obj.id}`);
    updateDoc(Ref, {
     isCompleted:toggle
    }); 
    return ()=>toggle
    
  },[toggle])
  
  
  

  return (
      
    <li className={toggle===true?"checked":null} onClick={()=>{setToggle(!toggle)}}>{obj.todo}<span className='close' onClick={()=>onDelete(obj)}>&#215;</span>
    </li>
              
    
  )
}
