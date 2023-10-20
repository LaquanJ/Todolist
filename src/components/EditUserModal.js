import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const EditUserModal = ({ onShow, onHide, user, onEditUser }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleFieldChange = (e, fieldName) => {
    const updatedUser = { ...editedUser, [fieldName]: e.target.value };
    setEditedUser(updatedUser);
  };

  const handleUpdate = () => {
    onEditUser(editedUser);
  };
  console.log(user)

  return (
    <Modal show={onShow} onHide={onHide}>
      <Modal.Header closeButton>
        <label>Edit User</label>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={editedUser.firstName}
              onChange={(e) => handleFieldChange(e, 'firstName')}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={editedUser.lastName}
              onChange={(e) => handleFieldChange(e, 'lastName')}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={editedUser.email}
              onChange={(e) => handleFieldChange(e, 'email')}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              value={editedUser.userName}
              onChange={(e) => handleFieldChange(e, 'userName')}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button  onClick={onHide}>
          Close
        </Button>
        <Button  onClick={handleUpdate}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;