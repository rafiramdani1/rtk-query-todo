import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } from '../apiSlice'

const TodosList = () => {

  const [newTodo, setNewTodo] = useState('')

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetTodosQuery()
  const [addTodo] = useAddTodoMutation()
  const [updateTodo] = useUpdateTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()

  const handleSubmit = e => {
    e.preventDefault()
    addTodo({ userId: 1, title: newTodo, completed: false })
    setNewTodo('')
  }

  const newItemSection =
    <form onSubmit={handleSubmit} className='mb-3'>
      <label className=''>Enter a new todo item</label>
      <div className='flex border p-2 gap-2'>
        <input
          type='text'
          id='todo'
          className='border w-full rounded-md px-2 py-1'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder='Enter new todo'
        />
        <button className='border bg-teal-500 px-2 rounded-md text-white hover:bg-teal-400'>
          <FontAwesomeIcon icon={faUpload} />
        </button>
      </div>
    </form>

  let content;
  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isSuccess) {
    content = todos.map(todo => {
      return (
        <article key={todo.id}>
          <div className='flex w-full justify-between px-4 py-4 border'>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                checked={todo.completed}
                className='w-5'
                id={todo.id}
                onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
              />
              <label htmlFor={todo.id} className='text-base font-medium'>{todo.title}</label>
            </div>
            <button onClick={() => deleteTodo({ id: todo.id })} className='border px-2 py-1 rounded-md bg-teal-500 text-white hover:bg-red-500'>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </article>
      )
    })
  } else if (isError) {
    content = <p>{error}</p>
  }

  return (
    <main className='px-2 mt-3 md:flex md:justify-center'>
      <div className='md:w-1/2'>
        <h1 className='text-2xl font-medium mb-2'>Todo List</h1>
        {newItemSection}
        {content}
      </div>
    </main>
  )
}

export default TodosList