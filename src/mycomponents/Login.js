import React from 'react'
import { useState } from 'react'
import {setDoc,doc,getDoc} from 'firebase/firestore'
import { db } from './Firebase'


export default function Login({loginSuccess,setFilename}) {
  const [clicklogin,setClicklogin]=useState(false)
  const [name,setName]=useState("");
  const [passw,setPassw]=useState("");
  const [loggedin,setLoggedin]=useState(false);
  const [displayName,setDisplayName]=useState('')
  
  const login=async() => {
  
    try{
      const ans=await loginSuccess(name,passw)
      if(!ans) alert("Incorrect username or password")
      else {
        console.log("login successful",name)
        setFilename(name)
        setClicklogin(!clicklogin)
        setDisplayName(name)
        setName("")
        setPassw("")
        setLoggedin(true)
      }
    }catch(ele){
      console.log(ele)
    }
    
    
  }

  const signup=async()=>{
    const ans=await doesUserExists(name)
    if(ans){
      alert("username already exists try another name")
    }else{
      
      console.log("Sign UP Successful",name)
      
      setClicklogin(!clicklogin)
      await setDoc(doc(db,name,"0"), {password:passw ,id:0});
      setFilename(name);
      setDisplayName(name)
      setName("")
      setPassw("")
      setLoggedin(true)
      
    }

  }

  const doesUserExists=async(name)=>{
    
    const docRef = doc(db, `${name}`, "0");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return true
    } else {
      return false
    }
  }

  function stop(e){
    e.preventDefault();
  }
  
  return (
    
    <div >
      
      

      {loggedin?<h3>Hi {displayName} <button className='buttonL' onClick={()=>{setLoggedin(!loggedin); setFilename("todos");}}>Sign Out</button></h3> :
          <button className="buttonL" onClick={()=>setClicklogin(!clicklogin) } > Login</button>
      }
      <div className='loginDiv' style={clicklogin?{display:"flex"}:{display:"none"}}>

        <div className="loginShade" >

          <form onSubmit={stop} className="login-content" >

              <span className="closeX" onClick={()=>setClicklogin(!clicklogin)}>&times;</span>
              <b>Username</b>
              <input type="text" className='inputname'  value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Username"  required/>
              <b>Password</b>
              <input type="password" className='inputpassword'  value={passw} onChange={(e)=>setPassw(e.target.value)}  placeholder="Enter Password" required/>
              <button onClick={()=>login()} className="buttonL">Login</button>
              <button onClick={()=>signup()} className="buttonL">Sign up</button>


          </form>

        </div> 


      </div>
      
    </div>
  )
}
