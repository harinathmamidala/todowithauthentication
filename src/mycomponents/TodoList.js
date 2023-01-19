import React from 'react'
import Todoitem from './Todoitem'

export default function TodoList({array,onDelete}) {
  
  return (
    <div>
     {
      React.Children.toArray(
        array.map((obj)=>{
          return <Todoitem obj={obj} onDelete={onDelete}/>
        })

      )
     
     
      }
    </div>
  )
}
