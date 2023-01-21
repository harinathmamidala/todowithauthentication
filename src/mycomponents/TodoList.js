import React from 'react'
import Todoitem from './Todoitem'

export default function TodoList({array,onDelete,filename}) {
  
  return (
    <ul>
     {
    
      array.map((obj)=>{
        return <Todoitem key={obj.id} obj={obj} onDelete={onDelete} filename={filename}/>
      })
      }
    </ul>
  )
}
