import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const EditUserModal = ({ show, onHide, user, onEditUser }) => {
  const [firstName, setFirstName] = useState(user ? user.firstName : '');
  const [lastName, setLastName] = useState(user ? user.lastName : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [userName, setUserName] = useState(user ? user.userName : '');

  const handleUpdate = () => {
    // onEditUser(user.id, data);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <label>Edit User</label>
      </Modal.Header>
      <Modal.Body>
        {
          show ? 
          <Form>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>
        </Form> : <></>
        }

      </Modal.Body>
      <Modal.Footer>
        <Button  onClick={onHide}>
          Close
        </Button>
        <Button  onClick={() => handleUpdate()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;