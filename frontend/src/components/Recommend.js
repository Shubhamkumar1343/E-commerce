import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "./Product";
import { Link } from "react-router-dom";

function Recommend(props) {
  const [recommendItems, setRecommendItems] = useState([]);

  useEffect(async () => {
    const { data } = await axios.get(
      `/api/classification/${props.gender}/${props.category}`
    );

    // for shuffling and cut 5 items
    let shuffledItems = data.sort(() => Math.random() - 0.5);

    // exclude duplicated item
    shuffledItems = shuffledItems.filter((item) => item._id !== props.id);

    // in place
    shuffledItems.splice(5);

    setRecommendItems(shuffledItems);
  }, []);
  return (
    <div className="mt-5">
      <h4 className="mb-4 fw-light text">You may also like</h4>
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
        {recommendItems.map((item) => (
          <Product key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
}

export default Recommend;
