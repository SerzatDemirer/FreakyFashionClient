import React from "react";
import "./DeleteProduct.css";

function DeleteProduct({ product, onDelete }) {
  return (
    <div className="delete-container">
      <h3>Are you sure you want to delete {product.name}?</h3>
      <button onClick={() => onDelete(product.sku)}>Delete</button>
    </div>
  );
}

export default DeleteProduct;
