import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Tweet from "../Tweet/Tweet";
import "./tweetsList.css";
import { onSnapshot, collection, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../util/dataBase";

function TweetsList() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "tweets"), orderBy("date", "desc"), limit(10));
    const unmount = onSnapshot(q, (snapshot) => {
      setTweets(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unmount;
  }, []);

  return (
    <Container className="d-flex flex-column col-6 p-0 list-breakpoint">
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} userName={tweet.userName} content={tweet.content} date={tweet.date} />
      ))}
    </Container>
  );
}

export default TweetsList;
