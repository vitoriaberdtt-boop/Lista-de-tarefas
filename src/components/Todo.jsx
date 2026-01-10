import React from 'react'

const Todo = ({todo, removeTodo, completeTodo}) => {
  return (
     <div className='todo' style={{textDecoration: todo.isCompleted ? 'line-through' : ''}}>
        <div className='content'>
                <p>{todo.text} - <em>{todo.category}</em></p>
        </div>
        <div className='actions'>
              <button className='c' onClick={() => completeTodo(todo.id)}>Completar</button>
              <button className='r' onClick={() => removeTodo(todo.id)}>Remover</button>
        </div>
    </div>
  )
}

export default Todo