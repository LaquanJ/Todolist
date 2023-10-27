import React, {useState, useEffect} from 'react';
import {Modal, Button, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const EditUserModal = ({ show, onHide, user, onEditUser }) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setUserName(user.userName);
    }
  }, [user]);

  const handleUpdate = () => {
    const updatedUser = {
        firstName,
        lastName,
        email,
        userName
    };
    onEditUser(user.id, updatedUser);
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