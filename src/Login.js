import "./Login.css";
import React, { useState, useEffect, useRef } from "react";
import getUsers from "./fakeAPI";
import { connect } from "react-redux";
import { SAVE_LOCAL_STORAGE } from "./redux/actions";

function Login({ savedUser, dispatch }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [fetchedUsers, setFetchedUsers] = useState();
  const notInitialRender = useRef(false);

  function validateLoginDetails(event) {
    event.preventDefault();

    // E-mail validation regular expression referenced from: https://www.w3resource.com/javascript/form/email-validation.php
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(usernameInput)) {
      if (passwordInput) {
        getUsers()
          .then((users) => {
            setFetchedUsers(
              users.find(
                ({ id, username, password }) =>
                  username === usernameInput && password === passwordInput
              )
            );
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("Please enter your password");
      }
    } else {
      alert("Username either BLANK or NOT VALID");
    }
  }
  useEffect(() => {
    if (notInitialRender.current) {
      if (fetchedUsers) {
        dispatch({ type: SAVE_LOCAL_STORAGE, payload: fetchedUsers });
        alert("Successfully logged in");
      }
    } else {
      notInitialRender.current = true;
    }
  }, [fetchedUsers]);

  useEffect(() => {
    if (savedUser.length > 0) {
      alert(`Welcome back ${[...savedUser]}`);
    }
  }, []);

  return (
    <div className="Login-container">
      <div className="Login-wrapper">
        <header className="Login-header">
          <span>Login Form</span>
        </header>
        <form className="Form" onSubmit={validateLoginDetails}>
          <input
            className="Form-text"
            type="text"
            placeholder="Username"
            value={usernameInput}
            onChange={(event) => setUsernameInput(event.target.value)}
          />
          <input
            className="Form-text"
            type="password"
            placeholder="Password"
            value={passwordInput}
            onChange={(event) => setPasswordInput(event.target.value)}
          />
          <input className="Form-submit" type="submit" value="Sign In" />
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (store) => {
  const { state } = store;
  return { savedUser: state.savedUser };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
