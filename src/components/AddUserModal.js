import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const AddUserModal = ({onShow, onHide, onAddUser}) =>{
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');

    const addUser = () => {
        //set user fields to newuser variable
        const newUser = {firstName, lastName, email, userName};
        // add new user 
        onAddUser(newUser)
        
        //set user fields back to empty

        setFirstName('');
        setLastName('');
        setEmail('');
        setUserName('');
    }

    const hide = () =>{
        //set user fields back to empty

        setFirstName('');
        setLastName('');
        setEmail('');
        setUserName('');

        // Hide the window
        onHide()
    }

    return (
        <Modal show={onShow} onHide={hide}>
          <Modal.Header closeButton>
            <Modal.Title>Add User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
              
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter User name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hide}>
              Close
            </Button>
            <Button variant="primary" onClick={addUser}>
              Add User
            </Button>
          </Modal.Footer>
        </Modal>
      );
};

export default AddUserModal;