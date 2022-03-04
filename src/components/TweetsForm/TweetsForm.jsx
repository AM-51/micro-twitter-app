import React, { useState, useContext } from "react";
import "./tweetsForm.css";
import { Form, Container, Button } from "react-bootstrap";
import { GiHummingbird } from "react-icons/gi";
import Loader from "../../util/Loader";
import { TweetsContext } from "../../context/TweetsContext";
import { addTweet } from "../../util/dataBase";

function TweetsForm() {
  const { currentUserCollection } = useContext(TweetsContext);
  const [maxCharactersError, setMaxCharactersError] = useState(false);
  const [loader, setLoader] = useState(false);
  const nowDate = new Date();
  const nowDateIso = nowDate.toISOString();

  const [tweet, setTweet] = useState({
    content: "",
  });

  function handleAddClick(event) {
    event.preventDefault();
    setLoader((prev) => !prev);
    addTweet([
      {
        userName: currentUserCollection.userName,
        content: tweet.content,
        date: nowDateIso,
        userID: currentUserCollection.id,
      },
    ]);
    setTweet({
      content: "",
    });
    setLoader((prev) => !prev);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    handleError();
    setTweet((preValues) => {
      return {
        ...preValues,
        [name]: value,
        userName: currentUserCollection.userName,
        date: nowDateIso,
      };
    });
  }

  const maxCharacters = tweet.content.length;

  function handleError() {
    if (maxCharacters >= 140) {
      setMaxCharactersError(true);
    } else {
      setMaxCharactersError(false);
    }
  }

  return (
    <Form className="mt-4">
      <Container className="d-flex flex-column col-6 border rounded p-2 form-breakpoint">
        <Form.Group
          className="mb-3 d-flex justify-content-center"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Control
            onChange={handleChange}
            value={tweet.content}
            name="content"
            className="tweet-textarea"
            as="textarea"
            rows={5}
            placeholder="Tweet your thoughts..."
            plaintext
          />
        </Form.Group>
        <Form.Group className="d-flex justify-content-between align-items-center">
          <p className="m-0">
            <small>{maxCharacters} / 140</small>
          </p>
          <Form.Group className="d-flex col-2 align-items-center justify-content-end">
            {loader && <Loader />}
            <Button
              onClick={handleAddClick}
              disabled={maxCharacters > 140 || maxCharacters === 0}
              className="post-btn"
              type="submit"
              value="Tweet"
              variant="dark"
            >
              <GiHummingbird className="post-icon" />
            </Button>
          </Form.Group>
        </Form.Group>
        {maxCharactersError && (
          <Form.Group className="text-danger">
            <small>The tweet can't contain more then 140 chars.</small>
          </Form.Group>
        )}
      </Container>
    </Form>
  );
}

export default TweetsForm;
