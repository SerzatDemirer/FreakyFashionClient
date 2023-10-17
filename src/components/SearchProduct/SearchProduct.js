import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SearchProduct.css";

function SearchProduct() {
  const [sku, setSku] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    console.log("searchResult has changed:", searchResult);
  }, [searchResult]);

  const handleSearch = () => {
    axios
      .get(`http://localhost:5075/products/${sku}`)
      .then((response) => {
        setSearchResult([response.data]);
      })
      .catch((error) => {
        console.error("There was an error with the search:", error);
      });
  };

  const [deleteMessage, setDeleteMessage] = useState("");

  const handleDelete = (sku) => {
    console.log("Before delete:", searchResult);
    axios
      .delete(`http://localhost:5075/products/${sku}`)
      .then(() => {
        setSearchResult((prevSearchResult) => {
          const updatedList = prevSearchResult.filter(
            (item) => item.sku !== sku
          );
          console.log("After delete:", updatedList);
          return updatedList;
        });
        // Visa meddelande
        setDeleteMessage("Produkten raderat");
        // Rensa meddelandet efter 3 sekunder
        setTimeout(() => {
          setDeleteMessage("");
        }, 3000);
        // Rensa formuläret (om du har en sådan funktion)
        // clearForm();
      })
      .catch((error) => {
        console.error("There was an error deleting the product:", error);
      });
    setShowDeleteConfirmation(false);
    setProductToDelete(null);
  };

  const handleDeleteConfirmation = (product) => {
    setShowDeleteConfirmation(true);
    setProductToDelete(product);
  };

  return (
    <div className="search-container">
      {deleteMessage && <div className="delete-message">{deleteMessage}</div>}

      <input
        type="text"
        value={sku}
        onChange={(e) => setSku(e.target.value)}
        placeholder="Enter SKU"
      />
      <button onClick={handleSearch}>Search</button>
      <div className="search-results">
        {searchResult.map((product) => (
          <div className="search-result-item" key={product.id}>
            <span>{product.name}</span>
            <span>{product.sku}</span>
            <span>{product.description}</span>
            <span>{product.price}</span>
            <button onClick={() => handleDeleteConfirmation(product)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      {showDeleteConfirmation && (
        <div className="delete-container">
          <h3>Är du säker på att du vill radera {productToDelete.name}?</h3>
          <button onClick={() => handleDelete(productToDelete.sku)}>Ja</button>
          <button onClick={() => setShowDeleteConfirmation(false)}>Nej</button>
        </div>
      )}
    </div>
  );
}

export default SearchProduct;
