import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchAllProducts() {
      const response = await fetch("localhost:8000/products");
      const data = await response.json();
      console.log(data);
      setProducts(data.products);
    }
    fetchAllProducts();
  }, []);

  return (
    <div>
      <h2>VitalVibes</h2>
      <h2>All Products</h2>
      <ul className="productList">
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/singleproduct/${product.id}`}>
              <h4 className="productName">{product.name}</h4>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Product;
