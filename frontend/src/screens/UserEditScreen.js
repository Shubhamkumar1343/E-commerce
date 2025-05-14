import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, editUser } from "../action/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_EDIT_RESET } from "../constants/userConstants";

function UserEditScreen(props) {
  const userId = props.match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userEdit = useSelector((state) => state.userEdit);
  const {
    loading: loadingEdit,
    success: successEdit,
    error: errorEdit,
  } = userEdit;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user || user._id !== userId) {
      dispatch(detailsUser(userId));
    } else if (user && successEdit) {
      setName(name);
      setEmail(email);
      setIsAdmin(isAdmin);

      setTimeout(() => {
        dispatch({ type: USER_EDIT_RESET });
        dispatch(detailsUser(userId));
      }, 3000);
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }

    if (user) {
      setIsAdmin(user.isAdmin);
    }
  }, [user, successEdit, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(editUser(userId, { name, email, isAdmin }, props));
  };

  return (
    <div className="d-flex py-5 justify-content-center">
      <form className="form" onSubmit={submitHandler}>
        {loadingEdit && <LoadingBox></LoadingBox>}
        {errorEdit && <MessageBox variant="danger">{errorEdit}</MessageBox>}
        {successEdit && (
          <MessageBox variant="success">
            User Info Successfully Edited
          </MessageBox>
        )}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div className="mb-4">
              <h1 className="fs-2 mb-3">Edit User</h1>
              <span className="text-secondary fw-light d-block">
                User Name : {user.name}
              </span>
              <span className="text-secondary fw-light d-block">
                User ID : {user._id}
              </span>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                className="form-control"
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-control"
                id="email"
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <div className="form-text">
                Never share user's email with anyone else.
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label" htmlFor="isAdmin">
                Is Admin?
              </label>
              <select
                className="form-select"
                id="isAdmin"
                value={isAdmin}
                onChange={(e) => {
                  setIsAdmin(e.target.value);
                }}
              >
                <option value={false}>No</option>
                <option value={true}>Admin</option>
              </select>
              <div className="form-text">
                Select option. Let the user be admin or not.
              </div>
            </div>
            <div className="d-grid pt-2">
              <button className="btn btn-outline-dark" type="submit">
                Edit
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default UserEditScreen;
