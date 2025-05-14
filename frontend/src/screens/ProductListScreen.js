import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../action/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from "../constants/productConstants";

export default function ProductListScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const [willBeDeletedId, setWillBeDeletedId] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    // dispatch(
    //   listProducts({ seller: sellerMode ? userInfo._id : "", pageNumber })
    // );
  }, [createdProduct, productDelete, dispatch, successCreate, userInfo._id]);

  const deleteHandler = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const history = useHistory();

  const editHandler = (productId) => {
    history.push(`/product/${productId}/edit`);
  };

  const createHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div className="container py-5">
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="d-flex mb-4">
            <h2 className="">Products</h2>
            <button
              type="button"
              className="btn btn-outline-dark btn-sm ms-auto me-3"
              onClick={createHandler}
            >
              Add Product
            </button>
          </div>
          <div className="overflow-scroll">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">ID</th>
                  <th scope="col">NAME</th>
                  <th scope="col">PRICE</th>
                  <th scope="col">CATEGORY</th>
                  <th scope="col">BRAND</th>
                  <th scope="col">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${Number(product.price).toFixed(2)}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-dark btn-sm"
                        onClick={() => editHandler(product._id)}
                      >
                        Edit
                      </button>{" "}
                      {/* <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </button> */}
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#DeleteModal"
                        onClick={() => setWillBeDeletedId(product._id)}
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
                    Product Delete
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
                  delete this product from the database?
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
