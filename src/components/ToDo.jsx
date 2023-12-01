import React, { useState } from 'react';

const ToDo = ({ todo, deleteTodo, onComplete, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState({
    title: todo.title,
    description: todo.description,
  });
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    editTodo(todo.id, editedTodo);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };
  const handleDeleteClick = () => {
    deleteTodo(todo.id);
  };

  const handleCompletedTodo = () => {
    onComplete(todo.id);
  };

  return (
    <div className='todo-list-item'>
      <div>
        {isEditing ? (
          <div className='todo-input'>
            <label>Title</label>
            <input
              type='text'
              value={editedTodo.title}
              onChange={(e) =>
                setEditedTodo({ ...editedTodo, title: e.target.value })
              }
            />
            <label>Description</label>
            <input
              type='text'
              value={editedTodo.description}
              onChange={(e) =>
                setEditedTodo({ ...editedTodo, description: e.target.value })
              }
            />
          </div>
        ) : (
          <div>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
          </div>
        )}
      </div>
      <div>
        {isEditing ? (
          <div>
            <button className='secondaryBtn' onClick={handleCancelClick}>
              Cancel
            </button>
            <button className='secondaryBtn' onClick={handleSaveClick}>
              Save
            </button>
          </div>
        ) : (
          <div>
            <button
              className='secondaryBtn check-icon'
              onClick={handleCompletedTodo}
            >
              Mark Complete
            </button>
            <button
              className='secondaryBtn edit-icon'
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button className='secondaryBtn icon' onClick={handleDeleteClick}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToDo;
