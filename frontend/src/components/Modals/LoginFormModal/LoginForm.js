import { useEffect, useState } from "react";
import * as sessionActions from "../../../store/sessionReducer";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    dispatch(sessionActions.login({ credential, password }))
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
    return (
      dispatch(sessionActions.login({ credential: "demo_user123", password: "password1" }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        })
    );
  };

  return (
    <div className="loginModal">
      <h1 className="header">Log In</h1>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="Username or Email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
          />
          {errors.credential && <p className="errors">{errors.credential}</p>}
        </label>
        <label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="errors">{errors.password}</p>}
          {errors.login && <p className="errors">{errors.login}</p>}
        </label>
        <button className="pink-button" type="submit">
          Log In
        </button>
      </form>
      <button id="demoUser" onClick={(e) => signInDemo(e)}>
        Log in as Demo User
      </button>
    </div>
  );
}

export default LoginFormModal;
