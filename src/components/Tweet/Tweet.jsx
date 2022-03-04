import React from "react";
import { Card } from "react-bootstrap";
import moment from "moment";

function Tweet(tweet) {
  return (
    <Card className="mt-4 mt-2 col-12">
      <Card.Header>Date Created: {moment(tweet.date).format("MMM Do YY, h:mm a")}</Card.Header>
      <Card.Body>
        <Card.Title>{tweet.userName}</Card.Title>
        <Card.Text>{tweet.content}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Tweet;
