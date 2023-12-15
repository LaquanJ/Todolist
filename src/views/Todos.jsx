// common modules
import React, { useState, useEffect } from 'react';

// custom modules
import TodoInput from '@components/ToDoInput';
import TodoList from '@components/ToDoList';
import api from '@utilities/todosApi.js';

function Todos() {
  const [toDoList, setToDoList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const addTodo = (todo) => {
    api
      .post('todos', todo)
      .then((response) => {
        console.log(response.data);
        setToDoList([...toDoList, { id: response.data.id, ...todo }]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const editTodo = (id, updatedTodo) => {
    //Put request to update todo
    api
      .put(`todos/${id}`, updatedTodo)
      .then((response) => {
        const updatedTodos = toDoList.map((todo) => {
          if (todo.id === id) {
            return { ...todo, ...updatedTodo };
          }
          return todo;
        });

        setToDoList(updatedTodos);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const markComplete = (id) => {
    const updatedTodo = { done: true };

    api
      .put(`todos/${id}`, updatedTodo)
      .then((response) => {
        const updatedTodos = toDoList.map((todo) => {
          if (todo.id === id) {
            return { ...todo, ...updatedTodo };
          }
          return todo;
        });
        setToDoList(updatedTodos);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteTodo = (id) => {
    api
      .delete(`todos/${id}`)
      .then(() => {
        const updatedTodos = toDoList.filter((todo) => todo.id !== id);
        setToDoList(updatedTodos);
      })
      .catch((error) => {
        console.error('Error deleting todo:', error);
      });
  };

  useEffect(() => {
    if (!isLoaded) {
      // fetch todos from API
      api
        .get('todos')
        .then((response) => {
          return response.data.results;
        })
        .then((todos) => {
          // set isLoaded to true when loading completes
          setIsLoaded(true);

          // update todo list in component state
          setToDoList(todos);
        })
        .catch((error) => {
          console.error(error);
          setIsLoaded(true); // set isLoaded to true when error occurs
        });
    }
  }, []);

  return (
    <div className='todos-view'>
      <h1 data-testid='todos-header'>Todos</h1>
      {isLoaded ? (
        toDoList && (
          <TodoList
            setToDoList={setToDoList}
            toDoList={toDoList}
            deleteTodo={deleteTodo}
            onComplete={markComplete}
            editTodo={editTodo}
          />
        )
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Todos;
