// common modules
import { useState, useEffect } from 'react';

// custom modules
import api from '@utilities/todosApi.js';
import '@views/Users.css';
import AddUserModal from '@components/AddUserModal';
import EditUserModal from '@components/EditUserModal';

function Users() {
  const [data, setData] = useState({
    isLoaded: false,
    users: []
  });
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  console.log('users rendered');

  useEffect(() => {
    if (!data.isLoaded) {
      // fetch todos from API
      api.get('users')
        .then((response) => {
          console.log(response.data.results);

          // update users and isLoaded
          setData({
            isLoaded: true,
            users: response.data.results
          })
        })
        .catch((error) => {
          console.error(error);
          setIsLoaded(true); // set isLoaded to true when error occurs
          setData({
            ...data,
            isLoaded: true,
          })
        })
    }
  }, []);

  const handleAdd = (user) => {
    api.post('users', user).then((response) => {
      console.log(response.data);
      setData({
        users:[...data.users, { id: response.data.id, ...user }],
        isLoaded: true
      });
    }).catch((error) => {
      console.error(error);
    })

    // close modal after user is added
    setShowAddUserModal(false)
  };

  //api call to edit user

  const handleEdit = (id, updatedUser) => {
    //Put request to update user
    api.put(`users/${id}`, updatedUser).then((response)=> {
      const updatedUsers = data.users.map((u) => {
        if(u.id === id) {
          return {...u, ...updatedUser};

        }
        return u;
  
      });

      setData({
        users:updatedUsers,
        isLoaded: true
      })
      // close modal after user is edited
    setShowEditUserModal(false)
    }).catch((error) => {
      console.error(error);
    })
  }

  const updateUser = (user) => {
    setEditUser(user)
    console.log('user/:', user)
    setShowEditUserModal(true);
  }

  const handleRemove = (id) => {
    api.delete(`users/${id}`)
      .then(() => {
        setData({
          isLoaded: true,
          users: data.users.filter((u) => u.id !== id)
        });
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
              <button onClick={() => setShowAddUserModal(true)}>+</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.users && data.users.map((u) => {
            return (
              <tr key={`user-${u.id}`}>
                <td>{u.id}</td>
                <td>{u.firstName}</td>
                <td>{u.lastName}</td>
                <td>{u.email}</td>
                <td>{u.userName}</td>
                <td>
                  <button onClick={() => updateUser(u)}>Edit</button>
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
          data.isLoaded ? usersTable() : <div>Loading...</div>
        }
      </div>
      <AddUserModal 
        onShow={showAddUserModal}
        onHide={() => setShowAddUserModal(false)}
        onAddUser={handleAdd}
      />
      <EditUserModal 
        show={showEditUserModal}
        onHide={() => setShowEditUserModal(false)}
        onEditUser={handleEdit}
        user={editUser}
      />
    </div>
  )
}

export default Users;
