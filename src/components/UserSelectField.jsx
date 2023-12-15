import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import api from '@utilities/todosApi.js';

const UserSelectField = ({ user, setUser }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!isLoaded) {
      // fetch todos from API
      api
        .get('users')
        .then((response) => {
          return response.data.results;
        })
        .then((users) => {
          // update todo list in component state
          setUsers(users);

          // set isLoaded to true when loading completes
          setIsLoaded(true);
        })
        .catch((error) => {
          console.error(error);
          setIsLoaded(true); // set isLoaded to true when error occurs
        });
    }
  }, []);

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  return (
    <>
      {isLoaded ? (
        <FormControl fullWidth>
          <InputLabel id='select-user-field-label'>User</InputLabel>
          <Select
            labelId='select-user-label'
            id='select-user-field'
            value={user}
            label='User'
            onChange={handleChange}
          >
            {users.length &&
              users.map((user) => {
                return (
                  <MenuItem
                    value={user}
                  >{`${user.firstName} ${user.lastName}`}</MenuItem>
                );
              })}
          </Select>
        </FormControl>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default UserSelectField;
