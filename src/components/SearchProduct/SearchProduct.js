import "./SearchProduct.css";
import DeleteProduct from "../DeleteProduct/DeleteProduct";
import React, { useState } from "react";
import axios from "axios";

function SearchProduct() {
  const [SKU, setSKU] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = () => {
    axios
      .get(`http://localhost:5075/products/${SKU}`)
      .then((response) => {
        setSearchResult(response.data);
      })
      .catch((error) => {
        console.error("There was an error with the search:", error);
      });
  };

  const handleDelete = (sku) => {
    axios
      .delete(`http://localhost:5075/products/${sku}`)
      .then(() => {
        setSearchResult(null);
      })
      .catch((error) => {
        console.error("There was an error deleting the product:", error);
      });
  };
  // ... (tidigare kod)
  return (
    <div className="search-container">
      <input
        type="text"
        value={SKU}
        onChange={(e) => setSKU(e.target.value)}
        placeholder="Enter SKU"
      />
      <button onClick={handleSearch}>Search</button>
      {searchResult && (
        <div>
          {/* Display search result here */}
          <DeleteProduct product={searchResult} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
}

export default SearchProduct;
