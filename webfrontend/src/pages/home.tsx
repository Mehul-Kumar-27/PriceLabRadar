import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const [amazonURL, setAmazonURL] = useState("");
  const [submittedURL, setSubmittedURL] = useState("");

  const { getProductData, product } = useContext(UserContext);

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAmazonURL(event.target.value);
  };

  const handleSubmit = () => {
    // You can perform further actions with the submitted URL here
    console.log(amazonURL);
    setSubmittedURL(amazonURL);
    getProductData(amazonURL);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>PriceLabRadar</h1>
      <p>Enter the URL of the product on Amazon:</p>
      <input
        type="text"
        value={amazonURL}
        onChange={handleInputChange}
        style={{ width: "300px", padding: "8px" }}
      />
      <br />
      <button
        onClick={handleSubmit}
        style={{ marginTop: "10px", padding: "8px" }}
      >
        Get Price History
      </button>

      <div>
        {product && product.Title && (
          <>
            <h2>{product.Title}</h2>
            <p>Price: {product.Price}</p>
            <p>Rating: {product.Rating}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
