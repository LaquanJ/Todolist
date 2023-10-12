// common modules
import { useState, useEffect } from 'react';

// custom modules
import api from '@utilities/todosApi.js';
import '@views/Users.css';

function Users() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!isLoaded) {
      // fetch todos from API
      api.get('users')
        .then((response) => {
          console.log(response.data.results);
          // update users in component state
          setUsers(response.data.results);

          // set isLoaded to true when loading completes
          setIsLoaded(true);
        })
        .catch((error) => {
          console.error(error);
          setIsLoaded(true); // set isLoaded to true when error occurs
        })
    }
  }, []);

  const handleAdd = (user) => {
    api.post('users', user).then((response) => {
      console.log(response.data);
      setUsers([...users, { id: response.data.id, ...user }]);
    }).catch((error) => {
      console.error(error);
    })


  };

  const handleRemove = (id) => {
    api.delete(`users/${id}`)
      .then(() => {
        setUsers(users.filter((u) => u.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting todo:', error);
      });
  };

  const usersTable = () => {
    return (
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>UserName</th>
            <th>
              <button onClick={() => handleAdd()}>+</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((u) => {
            return (
              <tr key={`user-${u.id}`}>
                <td>{u.id}</td>
                <td>{u.firstName}</td>
                <td>{u.lastName}</td>
                <td>{u.email}</td>
                <td>{u.userName}</td>
                <td>
                  <button onClick={() => handleRemove(u.id)}>Remove</button>
                </td>
              </tr>
            )
          })}
        </tbody>

      </table>
    )
  }

  return (
    <div className="users-view">
      <h1>Users</h1>
      <div className="users-view-content">
        {
          isLoaded ? usersTable() : <div>Loading...</div>
        }
      </div>
    </div>
  )
}

export default Users;
