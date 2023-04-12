import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [buttonClass, setButtonClass] = useState("submitButton disabled");
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const signInDemo = (e) => {
    e.preventDefault();
    setCredential("demoUser")
    setPassword("demoPassword")
    setButtonClass("")
    console.log("credentials =>", credential)
    console.log("password =>", password )
    return dispatch(sessionActions.login({ credential, password }))
    .then(closeModal)
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    });
  }

  useEffect(() => {
    if (credential.length >= 4 && password.length >= 6) {
      setButtonClass("submitButton");
    } else {
      setButtonClass("submitButton disabled");
    }
  }, [credential, password]);

  return (
    <>
      <h1 className="header">Log In</h1>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="Username or Email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button id="demoUser">Log in as Demo User</button>
        {errors.credential && <p className="errors">{errors.credential}</p>}
        <button className={buttonClass} disabled={buttonClass === "submitButton disabled"} type="submit">
          Log In
        </button>
      </form>
    </>
  );
}

export default LoginFormModal;
