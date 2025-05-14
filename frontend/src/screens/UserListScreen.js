import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteUser, listUsers } from "../action/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_EDIT_RESET } from "../constants/userConstants";

export default function UserListScreen(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const [willBeDeletedId, setWillBeDeletedId] = useState("");

  const userEdit = useSelector((state) => state.userEdit);
  const {
    loading: loadingEdit,
    success: successEdit,
    error: errorEdit,
  } = userEdit;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!users) {
      dispatch(listUsers());
    }
    if (successDelete) {
      dispatch(listUsers());
    }
    if (successEdit) {
      dispatch(listUsers());
    }
  }, [successDelete, successEdit]);

  const deleteHandler = (userId) => {
    dispatch(deleteUser(userId));
  };

  const history = useHistory();

  const editHandler = (userId) => {
    history.push(`/users/${userId}/edit`);
  };

  return (
    <div className="container py-5">
      <div className="">
        <h2>User List</h2>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {successDelete && (
        <MessageBox variant="success">User deleted successfully</MessageBox>
      )}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="overflow-scroll">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Is Admin</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "Admin" : "No"}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-dark btn-sm"
                        onClick={() => editHandler(user._id)}
                      >
                        Edit
                      </button>{" "}
                      {/* <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => deleteHandler(user)}
                    >
                      Delete
                    </button> */}
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#DeleteModal"
                        onClick={() => {
                          setWillBeDeletedId(user._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Modal */}
          <div
            className="modal fade"
            id="DeleteModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5
                    className="modal-title text-danger"
                    id="exampleModalLabel"
                  >
                    User Delete
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body text-secondary">
                  This action is irreversible action. <br /> Are you sure to
                  delete this user from the database?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-outline-danger"
                    onClick={() => deleteHandler(willBeDeletedId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Modal end */}
        </>
      )}
    </div>
  );
}
