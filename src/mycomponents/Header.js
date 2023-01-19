import React from 'react'
import { useState } from 'react';
export default function Header({AddTodo}) {
  const [input,setInput]=useState("");
  
  return (
    <div id={"myDIV"} className="header">
      <h2 style={{margin:"10px"}}>My To Do List</h2>
      <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} id={"myInput"} placeholder="Title..."/>
      <span onClick={()=>AddTodo(input,setInput)}className="addBtn">Add</span>
    </div>
  )
}
