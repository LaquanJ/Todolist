import React from 'react';
import ToDo from './ToDo';

const ToDoList = ({ toDoList }) => {
    return (
        <div>
            {toDoList && toDoList.map((todo) => {
                return (
                    <ToDo key={`todo-${todo.id}`} todo={todo} />
                )
            })}
        </div>
    )
}

export default ToDoList;