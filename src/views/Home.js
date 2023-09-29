'use strict'

// common modules
import { useState, useEffect } from 'react';

// custom modules
import TodoInput from '@components/ToDoInput';
import TodoList from '@components/ToDoList';
import api from '@utilities/todosApi.js';


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
  const [toDoList, setToDoList] = useState([]);
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const addTodo = (todo) => {
    setToDoList([todo, ...toDoList]);
  };

  useEffect(() => {
    if (!isLoaded) {
      api.get('todos').then((response) => {
        setToDoList(response.data.results);
        setIsLoaded(true);
      }).catch((error) => {
        console.error(error);
        setIsLoaded(true);
      })
    }
  }, []);

  return (
    <div className="home">
      <div className="todo-wrapper">
        <TodoInput addTodoFn={addTodo} />
        <div className='btn-area'>
          <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={() => setIsCompleteScreen(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={() => setIsCompleteScreen(true)}>Completed</button>
        </div>
        {isLoaded && <TodoList toDoList={toDoList} />}

      </div>
    </div>
  )
}

export default Home;