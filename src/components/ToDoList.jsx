import React from 'react';
import ToDo from './ToDo';

const ToDoList = ({ toDoList, deleteTodo, onComplete, editTodo }) => {
    return (
        <div className="todo-list">
            {toDoList && toDoList.map((todo) => {
                return (
                    <ToDo key={`todo-${todo.id}`} todo={todo} deleteTodo={deleteTodo} onComplete={onComplete} editTodo={editTodo}/>
                )
            })}
        </div>
    )
}

export default ToDoList;