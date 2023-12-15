// common modules
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import AddTask from '@mui/icons-material/AddTask';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

// custom modules
import AddTodoModal from '@components/AddTodoModal';
import api from '@utilities/todosApi.js';

const ToDoList = ({ toDoList, setToDoList }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
    },
    {
      field: 'title',
      headerName: 'Title',
      flex: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: true,
    },
    {
      field: 'done',
      headerName: 'Done',
      width: 90,
    },
    {
      headerName: '',
      sortable: false,
      filterable: false,
      hideable: false,
      renderHeader: (params) => {
        return (
          <IconButton
            aria-label='add-todo-button'
            color='primary'
            onClick={() => setShowAddModal(true)}
          >
            <AddTask />
          </IconButton>
        );
      },
      renderCell: (params) => {
        return (
          <Box>
            <IconButton
              aria-label='delete-todo-button'
              color='primary'
              onClick={() => deleteTodo(params.row.id)}
            >
              <Delete />
            </IconButton>
            <IconButton
              aria-label='edit-todo-button'
              color='primary'
              onClick={handleEdit}
            >
              <Edit />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const handleDelete = () => {
    alert('DELETE TODO');
  };

  const handleAdd = (todo) => {
    api
      .post('todos', todo)
      .then((response) => {
        console.log(response.data);
        setToDoList([...toDoList, { id: response.data.id, ...todo }]);
        setShowAddModal(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEdit = () => {
    alert('EDIT TODO');
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <AddTodoModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAdd}
      />
      <DataGrid
        rows={toDoList}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default ToDoList;
