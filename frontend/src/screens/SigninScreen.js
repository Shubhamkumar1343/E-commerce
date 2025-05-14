import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../action/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo]);

  return (
    <div className="d-flex justify-content-center align-items-start py-5">
      <form onSubmit={submitHandler}>
        <h2 className="mb-4">Sign In</h2>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="example@email.com"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="form-text">8-20 Characters</div>
        </div>
        <div className="mb-4 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        {loading ? (
          <div className="d-grid mb-4">
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
          <div className="d-grid mb-4">
            <button type="submit" className="btn btn-outline-dark ">
              Sign In
            </button>
          </div>
        )}

        <div className="">
          New customer?{" "}
          <Link
            className="text-decoration-underline"
            to={`/register?redirect=${redirect}`}
          >
            Create your account
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SigninScreen;
