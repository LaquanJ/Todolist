import React from 'react';
import ToDo from './ToDo';

const ToDoList = ({ toDoList }) => {
    return (
        <div className="todo-list">
            {toDoList && toDoList.map((todo) => {
                return (
                    <ToDo key={`todo-${todo.id}`} todo={todo} />
                )
            })}
        </div>
    )
}

export default ToDoList;