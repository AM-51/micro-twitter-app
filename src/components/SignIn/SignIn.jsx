import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { logIn, signInWithGoogle } from "../../util/dataBase";
import { FcGoogle } from "react-icons/fc";
import { MdLocalPostOffice } from "react-icons/md";
import "./signin.css";
import { useNavigate } from "react-router-dom";
import SignUpModal from "../SignUpModal/SignUpModal";
import { TweetsContext } from "../../context/TweetsContext";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoading } = useContext(TweetsContext);

  let navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);

  async function handleLogInClick(event) {
    event.preventDefault();
    setLoading(true);
    try {
      await logIn(email, password);
      navigate("/home");
    } catch {
      alert("You need to sign up first");
    } finally {
      setLoading(false);
    }
  }

  function handleLogInWithGoogleClick(event) {
    event.preventDefault();
    setLoading(true);
    try {
      signInWithGoogle();
    } catch {
      alert("Something went wrong...");
    } finally {
      setLoading(false);
      navigate("/home");
    }
  }

  function onShowClick(event) {
    event.preventDefault();
    setModalShow(!modalShow);
  }

  function handleEmailChange(event) {
    const { value } = event.target;
    setEmail(value);
  }

  function handlePasswordChange(event) {
    const { value } = event.target;
    setPassword(value);
  }

  return (
    <Form.Group className="d-flex justify-content-center col-12 mt-4">
      <Form.Group className="d-flex col-6 justify-content-center sign-in-breakpoint">
        <Form className="col-12 sign-in-breakpoint">
          <h1 className="display-6 m-0">Sign In</h1>
          <Form.Group className="my-3 d-flex border rounded p-2 justify-content-between align-items-center" controlId="formBasicEmail">
            <Form.Control className="input" onChange={handleEmailChange} type="email" placeholder="Enter email" plaintext autoComplete="off" />
          </Form.Group>
          <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center" controlId="formBasicPassword">
            <Form.Control className="input" onChange={handlePasswordChange} type="password" placeholder="Password" plaintext autoComplete="off" />
          </Form.Group>
          <Form.Group className="d-flex col-12 align-items-center justify-breakpoint">
            <Button onClick={handleLogInClick} variant="dark" type="submit">
              Sign In With <MdLocalPostOffice className="post-icon pb-1" />
            </Button>
            <Button onClick={handleLogInWithGoogleClick} className="ms-2" variant="dark" type="submit">
              Sign In With <FcGoogle className="google-icon pb-1" />
            </Button>
          </Form.Group>
          <Form.Group className="d-flex mt-2 justify-content-center align-items-center">
            <Form.Label className="m-0">Don't have an account yet?</Form.Label>
            <Button className="btn text-decoration-underline" onClick={onShowClick} variant="btn-outline-dark" type="submit">
              Sign Up Now
            </Button>
          </Form.Group>
        </Form>
      </Form.Group>
      <>
        <SignUpModal show={modalShow} onHide={() => setModalShow(false)} />
      </>
    </Form.Group>
  );
}

export default SignIn;
