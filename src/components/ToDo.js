import React from 'react';
import { useState } from 'react';

const ToDo = ({ todo, deleteTodo}) => {

const handleDeleteClick = () => {
    deleteTodo(todo.id);
}
 
    return (
        <div className="todo-list-item">
            <div>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            </div>
            <div>
            <button className="secondaryBtn check-icon">Mark Complete</button>
            <button className="secondaryBtn edit-icon">Edit</button>
            <button className="secondaryBtn icon" onClick={handleDeleteClick}>Delete</button>
            </div>

        </div>
    )
}

export default ToDo;


