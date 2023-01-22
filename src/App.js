import './App.css';
import Header from './mycomponents/Header';
import Login from './mycomponents/Login';
import TodoList from './mycomponents/TodoList';
import { useEffect, useState } from 'react';
import { db } from './mycomponents/Firebase';
import {collection,setDoc,deleteDoc,doc, orderBy,getDoc,getDocs} from 'firebase/firestore'


function App() {
  let name=localStorage.getItem("qwe");
  
  const [todos,setTodos]=useState([])
  const [filename,setFilename]=useState(name===null?'todos':name)
  // console.log(localStorage.getItem("todos"))
  
  useEffect(()=>{

    async function fetchData(){
      let todoarr=[]
      try{
        const querySnapshot = await getDocs(collection( db ,filename),orderBy("id"));
        querySnapshot.forEach((doc) => {
          if(doc.id!=='0'){
            console.log(doc.id, " => ", doc.data());
            todoarr.push({id:doc.id ,...doc.data()})
          }
        });
        setTodos(todoarr)
      }catch(ele){
        console.log(ele)
      }
      
    }
    fetchData();
    
    return ()=>filename;

  },[filename])
  

  const loginSuccess=async(name,password)=>{

      const docRef = doc(db, `${name}`, "0");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data().password===password
      } else {
        return false
      }
      
  }

  const AddTodo=(todo,setInput)=>{
    if(!todo){
      alert("Enter a Todo")
    }else{
      var id=100;
      if(todos.length!==0){

        id=Number(todos[todos.length-1].id)+1;
      }
      
      let mytodo={
        id:id,
        todo:todo,
        isCompleted:false
      }
      console.log('adding',{mytodo})
      
      const cityRef = doc(db,filename,`${mytodo.id}`);
      setDoc(cityRef, mytodo, { merge: true });
      setTodos([...todos,mytodo])
    }
    setInput("");
  }

  const onDelete=(todo)=>{
    deleteDoc(doc(db, "todos", `${todo.id}`));
    console.log("deleting",{todo})
    setTodos(
      todos.filter((ele)=>{
        return todo!==ele;
      })
    )

  }





  return (
   <div className='content'>
    <Login loginSuccess={loginSuccess} setFilename={setFilename} catchName={name}/>
    <Header AddTodo={AddTodo}/>
    <TodoList array={todos} onDelete={onDelete} filename={filename}/>
   </div>
  );
}

export default App;