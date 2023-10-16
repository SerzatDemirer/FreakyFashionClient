import React, { useState } from "react";
import axios from "axios";
import "./AddProduct.css";

function AddProduct({ setProducts, products }) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    SKU: "",
    description: "",
    imageUrl: "",
    price: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:5075/products", newProduct)
      .then((response) => {
        setProducts([...products, response.data]);
      })
      .catch((error) => {
        console.error("Det var ett fel vid skapande av produkt: ", error);
      });
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newProduct.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="SKU"
          placeholder="SKU"
          value={newProduct.SKU}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={newProduct.imageUrl}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleInputChange}
        />
        <button type="submit" onClick={handleSubmit}>
          Add Product
        </button>
      </form>
    </div>
  );

  // Här kommer din kod för att lägga till en produkt
}

export default AddProduct;
