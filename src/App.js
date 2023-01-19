import './App.css';
import Header from './mycomponents/Header';
import TodoList from './mycomponents/TodoList';
import { useEffect, useState } from 'react';
import { db } from './mycomponents/Firebase';
import {query,collection,onSnapshot,setDoc,deleteDoc,doc, orderBy} from 'firebase/firestore'

function App() {

  console.log("app render")
  const [todos,setTodos]=useState([])

  useEffect(()=>{
    const q=query(collection( db ,'todos'),orderBy("id"))
    const unsubscribe=onSnapshot(q,(querySnapshot)=> {
      let todoarr=[]
      querySnapshot.forEach((doc)=>{
        todoarr.push({...doc.data(),id:doc.id})
      })
      setTodos(todoarr)
    })
    console.log("getting data....")
    return ()=>unsubscribe()
  },[])


  const AddTodo=(todo,setInput)=>{
    if(!todo){
      alert("enter field")
    }else{
      var id=1;
      if(todos.length!==0){

        id=Number(todos[todos.length-1].id)+1;
      }
      
      let mytodo={
        id:id,
        todo:todo,
        isCompleted:false
      }
      console.log('adding',{mytodo})
      const cityRef = doc(db, 'todos',`${mytodo.id}`);
      setDoc(cityRef, mytodo, { merge: true });

      // addDoc(collection(db, "todos"),{todo:mytodo.todo})
      // setTodos([...todos,mytodo])
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
    <Header AddTodo={AddTodo}/>
    {/* <Input AddTodo={AddTodo} /> */}
    <TodoList array={todos} onDelete={onDelete}/>
   </div>
  );
}

export default App;