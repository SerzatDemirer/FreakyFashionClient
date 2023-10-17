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

  const [errors, setErrors] = useState({});
  const [addMessage, setAddMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const validateSKU = (sku) => {
    const regex = /^\d{2,6}$/;
    return regex.test(sku);
  };

  const validatePrice = (price) => {
    return price > 0;
  };

  const clearForm = () => {
    setNewProduct({
      name: "",
      SKU: "",
      description: "",
      imageUrl: "",
      price: 0,
    });
  };

  const handleSubmit = () => {
    let newErrors = {};

    if (!validateSKU(newProduct.SKU)) {
      newErrors.SKU = "SKU måste vara ett heltal med 2 till 6 siffror.";
    }

    if (!validatePrice(newProduct.price)) {
      newErrors.price = "Priset måste vara större än 0.";
    }

    if (Object.keys(newErrors).length === 0) {
      axios
        .post("http://localhost:5075/products", newProduct)
        .then((response) => {
          setProducts([...products, response.data]);
          setAddMessage("Produkten sparad!");
          setTimeout(() => {
            setAddMessage("");
          }, 3000);
          clearForm();
        })
        .catch((error) => {
          console.error("Det var ett fel vid skapande av produkt: ", error);
        });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="add-product-container">
      {addMessage && <div className="add-message">{addMessage}</div>}

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
        {errors.SKU && <p>{errors.SKU}</p>}
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
        {errors.price && <p>{errors.price}</p>}
        <button type="submit" onClick={handleSubmit}>
          Add Product
        </button>
      </form>
    </div>
  );

  // Här kommer din kod för att lägga till en produkt
}

export default AddProduct;
