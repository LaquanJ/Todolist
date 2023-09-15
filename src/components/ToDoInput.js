import React from "react";

const TodoInput = () => {
return(
    <div className='todo-input'>
            <div className='todo-input-item'>
              <label>Title</label>
              <input type='text' placeholder='What is the tasks title' />
            </div>
            <div className='todo-input-item'>
              <label>Description</label>
              <input type='text' placeholder='What is the tasks description' />
            </div>
            <div className='todo-input-item'>
              <button className='primaryBtn' type='button'>Add</button>
            </div>            
        </div>
)
}

export default TodoInput;