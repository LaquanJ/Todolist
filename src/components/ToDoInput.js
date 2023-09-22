// common modules
import { useState } from 'react';

const TodoInput = ({ addTodoFn }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className='todo-input'>
      <div className='todo-input-item'>
        <label>Title</label>
        <input
          type='text'
          placeholder='What is the tasks title'
          value={title}
          onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className='todo-input-item'>
        <label>Description</label>
        <input
          type='text'
          placeholder='What is the tasks description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className='todo-input-item'>
        <button
          className='primaryBtn'
          type='button'
          onClick={() => addTodoFn({ title, description })}>
          Add
        </button>
      </div>
    </div>
  )
}

export default TodoInput;