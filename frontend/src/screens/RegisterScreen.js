import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../action/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password are not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo]);

  return (
    <div className="d-flex justify-content-center py-5">
      <form className="form" onSubmit={submitHandler}>
        <div className="">
          <h1 className="mb-4">Register</h1>

          {error && <MessageBox variant="danger">{error}</MessageBox>}
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            className="form-control"
            type="text"
            id="name"
            placeholder="Enter name"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            4-20 Characters
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Email Address
          </label>
          <input
            className="form-control"
            type="email"
            id="email"
            placeholder="example@email.com"
            required
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="form-label" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="form-control"
            type="password"
            id="confirmPassword"
            placeholder="Enter confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="d-grid mb-4 pt-2">
            <button class="btn btn-outline-dark" type="button">
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span class=""> Loading...</span>
            </button>
          </div>
        ) : (
          <div className="d-grid mb-4 pt-2">
            <button type="submit" className="btn btn-outline-dark ">
              Register
            </button>
          </div>
        )}

        <div className="mt-2">
          Already have an account?{" "}
          <Link
            className="text-decoration-underline"
            to={`/signin?redirect=${redirect}`}
          >
            Go to Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterScreen;
