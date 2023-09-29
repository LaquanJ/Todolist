'use strict'

// common modules
import { useState } from 'react';

// custom modules
import TodoInput from '@components/ToDoInput';
import TodoList from '@components/ToDoList';


const users = [
  {
    id: 1,
    email: 'johndoe@email.com',
    userName: 'johnnyd',
    firstName: 'John',
    lastName: 'Doe'
  }
];

const todos = [
  {
    id: 1,
    title: 'Exercise',
    description: 'Run 2 Miles',
    done: false,
    user: users[0]
  },
  {
    id: 2,
    title: 'Homework',
    description: 'Finish Coding Project',
    done: false,
    user: users[0]
  }
];


function Home() {
  const [toDoList, setToDoList] = useState(todos);

  const addTodo = (todo) => {
    setToDoList([todo, ...toDoList]);
  };

  const [isCompleteScreen, setIsCompleteScreen] = useState(false);

  return (
    <div className="home">
      <div className="todo-wrapper">
        <TodoInput addTodoFn={addTodo} />
        <div className='btn-area'>
          <button className={`secondaryBtn ${isCompleteScreen===false && 'active'}`} onclick={ () => setIsCompleteScreen(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompleteScreen===true && 'active'}`} onclick={ () => setIsCompleteScreen(true)}>Completed</button>
        </div>
        <TodoList toDoList={toDoList} />

      </div>
    </div>
  )
}

export default Home;