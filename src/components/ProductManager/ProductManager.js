import React, { useState, useEffect } from "react";
import axios from "axios";
import AddProduct from "../AddProduct/AddProduct";
import SearchProduct from "../SearchProduct/SearchProduct";

function ProductManager() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5075/products") // Ändra URL:en till din backend-URL
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Det var ett fel vid hämtning av data: ", error);
      });
  }, []);

  return (
    <div>
      <h1>Product Manager</h1>
      <AddProduct setProducts={setProducts} products={products} />
      <SearchProduct />
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name} - {product.SKU} - {product.description} -{" "}
            {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductManager;
