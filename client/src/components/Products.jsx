import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const baseurl = 'https://ecommerce-fullstack-3e0l.onrender.com'

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchAllProducts() {
      const response = await fetch(`${baseurl}/api/products`);
      const data = await response.json();
      console.log(data);
      setProducts(data);
    }
    fetchAllProducts();
  }, []);

  return (
    <div>
      {/* <h2>VitalVibes</h2> */}
      <h2 className="allProducts">All Products</h2>
      <br />
      <ul className="productList">
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img src={product.img} />
              <h5 className="productName">{product.name}</h5>
              <h5 className="productPrice">${product.price}</h5>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
