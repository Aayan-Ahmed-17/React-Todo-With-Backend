import axios from 'axios';
import React, { useEffect, useState } from 'react'

const App = () => {
  const [input , setInput] = useState('')
  const [todo , setTodo] = useState([])


  useEffect(()=>{
    async function getData(){
      const response = await axios('http://localhost:3000/todo')
      console.log(response.data.todos)
      setTodo(response.data.todos)
    }

    getData()
  } , [])

  const addTodo = async (event)=>{
    event.preventDefault();
    console.log(input);

    const response = await axios.post('http://localhost:3000/todo' , {
      title: input
    })
    
    console.log(response)
    setTodo([...todo , response.data.todo])

  }

  const delTodo = async (id)=>{
    const response = await axios.delete(`http://localhost:3000/todo/${id}`)
    console.log(response)
  }

  const editTodo = async (id)=>{
    const updated = prompt('enter updated val')
    const response = await axios.put(`http://localhost:3000/todo/${id}` , {
      title: updated
    })
    console.log(response)
  }
  return (
    <>
    <h1>Todo App</h1>

    <form onSubmit={addTodo}>
      <input onChange={e => setInput(e.target.value)} type="text" placeholder='enter your todo' />
      <button type='submit'>Add Todo</button>
    </form>

    <ul>
      {todo ? todo.map(item => {
        return <li key={item.id}>{item.title}
        <button onClick={()=> delTodo(item.id)}>delete</button>
        <button onClick={()=> editTodo(item.id)}>edit</button>
        </li>
      }): <h1>Loading...</h1>}
    </ul>
    </>
  )
}

export default App