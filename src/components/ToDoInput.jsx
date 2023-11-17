// common modules
import { useState } from 'react';

const TodoInput = ({ addTodoFn, users }) => {



  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  const handleClick = () => {
    addTodoFn({title, description, userId: selectedUser});
    setTitle("");
    setDescription("");
    setSelectedUser('');
  }

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
        <label>Users</label>
  <select
    value={selectedUser}
    onChange={(e) => setSelectedUser(e.target.value)}
  >
    <option value=''>Select a user</option>
    {users.map((user) => (
      <option key={`user-${user.id}`} value={user.id}>
        {user.userName}
      </option>
    ))}
  </select>
      </div>

      <div className='todo-input-item'>
        <button
          className='primaryBtn'
          type='button'
          onClick={handleClick}
          >
          Add
        </button>
      </div>
    </div>
  )
}

export default TodoInput;