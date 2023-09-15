import './App.css';
import Header from './components/Header';
import React, { useState } from 'react';
import TodoInput from './components/ToDoInput';

function App() {

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

  const [toDoList, setToDoList] = useState([todos]);

  return (
    <div className="App">
      <Header />

      <div className="todo-wrapper">
        <TodoInput />
      </div>
    </div>
  );
}

export default App;
