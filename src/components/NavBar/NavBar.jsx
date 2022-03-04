import React, { useContext } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { GiHummingbird } from "react-icons/gi";
import { MdOutlineLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { TweetsContext } from "../../context/TweetsContext";
import { logOut } from "../../util/dataBase";

function NavBar() {
  const { currentUserCollection, setCurrentUserCollection } =
    useContext(TweetsContext);
  let navigate = useNavigate();

  async function handleLogOutClick(event) {
    event.preventDefault();
    try {
      await logOut();
      setCurrentUserCollection(null);
      navigate("/");
    } catch {
      alert("Error");
    }
  }

  return (
    <Navbar
      bg="dark"
      variant="dark"
      className="d-flex p-2 align-items-center col-12"
    >
      <Navbar.Brand className="fw-normal">
        <GiHummingbird className="navbar-icon" /> Micro Twitter |
      </Navbar.Brand>
      <Nav>
        {currentUserCollection && (
          <Link
            className="link-secondary me-3 text-decoration-none text-light"
            to="/home"
          >
            Home
          </Link>
        )}
        {currentUserCollection && (
          <Link
            className="link-secondary me-3 text-decoration-none text-light"
            to="/profile"
          >
            Profile
          </Link>
        )}
      </Nav>
      <Nav className="ms-2">
        {currentUserCollection && (
          <Button
            className="btn text-light"
            onClick={handleLogOutClick}
            variant="btn-outline-dark"
            type="submit"
          >
            <MdOutlineLogout />
          </Button>
        )}
      </Nav>
    </Navbar>
  );
}

export default NavBar;
