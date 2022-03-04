import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TweetsContext } from "./context/TweetsContext";
import SignIn from "./components/SignIn/SignIn";
import { auth } from "./util/dataBase";
import { onSnapshot, collection, getDoc, doc, query } from "firebase/firestore";
import { db } from "./util/dataBase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [currentUserCollection, setCurrentUserCollection] = useState();
  const [modalName, setModalName] = useState("");
  const [allUsers, setAllUsers] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unmount = onSnapshot(q, (snapshot) => {
      setAllUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unmount;
  }, []);

  useEffect(() => {
    const unmount = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setCurrentUserCollection(docSnap.data());
      }
    });
    return unmount;
  }, [loading]);

  return (
    <div className="app-breakpoint">
      <TweetsContext.Provider value={{ setLoading, allUsers, currentUserCollection, setCurrentUserCollection, modalName, setModalName }}>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/home" element={currentUserCollection && <Home />} />
            <Route path="/profile" element={currentUserCollection && <Profile />} />
          </Routes>
        </Router>
      </TweetsContext.Provider>
    </div>
  );
}

export default App;
