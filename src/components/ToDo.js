import React from 'react';

const ToDov = ({todo}) => {
    return (
        <div className={todo.done ? "strike" : ""}>
            {todo.title}
            {todo.description}
        </div>
    )
}