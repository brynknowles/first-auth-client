import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import NavBar from "./NavBar";
import Profile from "./Profile";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3000/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((r) => r.json())
        .then((user) => {
          // save the user into state
          setCurrentUser(user);
          // and redirect
        });
    }
  }, []);

  console.log({ currentUser });

  return (
    <>
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <main>
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login setCurrentUser={setCurrentUser} />
          </Route>
          <Route path="/profile">
            {currentUser ? (
              <Profile currentUser={currentUser} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/">
            {currentUser ? (
              <h1>Welcome, {currentUser.username}</h1>
            ) : (
              <h1>Please Login or Sign Up</h1>
            )}
          </Route>
        </Switch>
      </main>
    </>
  );

export default App;
