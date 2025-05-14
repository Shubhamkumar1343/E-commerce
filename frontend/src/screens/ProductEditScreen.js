import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { detailsProduct, updateProduct } from "../action/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

export default function ProductEditScreen(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [gender, setGender] = useState("");
  const [kids, setKids] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      props.history.push("/productlist");
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setBrand(product.brand);
      setGender(product.gender);
      setKids(product.kids);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product, dispatch, productId, successUpdate, props.history]);

  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product

    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        brand,
        gender,
        kids,
        countInStock,
        description,
      })
    );
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center py-5">
      <form className="form" onSubmit={submitHandler}>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div className="mb-4">
              <h1>Edit Product </h1>
              <span className="text-secondary d-block fw-light">
                Product Name : {product.name}
              </span>
              <span className="text-secondary d-block fw-light">
                Product ID : {product._id}
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
              <label className="form-label" htmlFor="price">
                Price
              </label>
              <input
                className="form-control"
                id="price"
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
              <div className="form-text">Unit : US Dollar</div>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="imageFile">
                Image File
              </label>
              <input
                className="form-control"
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
              {setImage && (
                <div className="d-flex mx-auto mt-4" style={{ width: 300 }}>
                  <img className="img-thumbnail" src={image} alt="" />
                </div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="image">
                Image File Location
              </label>
              <input
                className="form-control"
                id="image"
                type="text"
                placeholder="Enter image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
              <div className="form-text">
                Image file location will be decided automatically <br /> once
                image file is uploaded.
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="category">
                Category
              </label>
              <input
                className="form-control"
                id="category"
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="brand">
                Brand
              </label>
              <input
                className="form-control"
                id="brand"
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="gender">
                Gender
              </label>
              <select
                className="form-select"
                id="gender"
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <option value={"men"}>Men</option>
                <option value={"women"}>Women</option>
                <option value={"other"}>Other</option>
              </select>
              <div className="form-text">Select option.</div>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="kids">
                kids
              </label>
              <select
                className="form-select"
                id="kids"
                value={kids}
                onChange={(e) => {
                  setKids(e.target.value);
                }}
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
              <div className="form-text">Select option.</div>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="countInStock">
                Count In Stock
              </label>
              <input
                className="form-control"
                id="countInStock"
                type="text"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></input>
            </div>
            <div className="mb-4">
              <label className="form-label" htmlFor="description">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                type="text"
                value={description}
                placeholder="Enter description"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <div className="form-text">Product specification</div>
            </div>
            <div className="d-gird pt-2 d-grid">
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
