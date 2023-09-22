import React from 'react';

const ToDo = ({ todo }) => {
    return (
        <div className={todo.done ? "strike" : ""}>
            {todo.title}
            {todo.description}
        </div>
    )
}

export default ToDo;