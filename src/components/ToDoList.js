import React from 'react';
import ToDo from './ToDo';

const ToDoList = ({ToDoList}) => {
return (
    <div>
        {ToDoList.map(todo => {
            return (
                <Todo todo={todo} />
            )
        })} 
    </div>
)
}

export default ToDoList;