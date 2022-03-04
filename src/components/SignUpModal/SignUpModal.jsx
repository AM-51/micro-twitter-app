import React, { useState, useContext } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { TweetsContext } from "../../context/TweetsContext";
import { useNavigate } from "react-router-dom";
import { signUp, addUser } from "../../util/dataBase";

export function SignUpModal(props) {
  const { modalName, setModalName, setLoading } = useContext(TweetsContext);
  let navigate = useNavigate();
  const [modalEmail, setModalEmail] = useState("");
  const [modalPassword, setModalPassword] = useState("");

  function handleNameModalChange(event) {
    const { value } = event.target;
    setModalName(value);
  }

  function handleEmailModalChange(event) {
    const { value } = event.target;
    setModalEmail(value);
  }

  function handlePasswordModalChange(event) {
    const { value } = event.target;
    setModalPassword(value);
  }

  async function handleSignUpClick(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await signUp(modalEmail, modalPassword);
      addUser({ response: response.user, modalName });
      navigate("/home");
      return response.user;
    } catch {
      alert("Already signed up");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center" controlId="formBasicEmail">
          <Form.Control className="input" onChange={handleNameModalChange} type="text" placeholder="Enter Full Name" plaintext autoComplete="off" />
        </Form.Group>
        <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center" controlId="formBasicEmail">
          <Form.Control className="input" onChange={handleEmailModalChange} type="email" placeholder="Enter email" plaintext autoComplete="off" />
        </Form.Group>
        <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center" controlId="formBasicPassword">
          <Form.Control className="input" onChange={handlePasswordModalChange} type="password" placeholder="Password" plaintext autoComplete="off" />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSignUpClick} variant="dark">
          Sign Up
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SignUpModal;
