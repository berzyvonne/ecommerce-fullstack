import React, { useEffect, useState } from "react";
// import { addItemToCart } from "../../../server/seed";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        // User is not authenticated, get items from local storage
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(localCart);
      } else {
        // User is authenticated, get items from server
        try {
          const response = await fetch("https://ecommerce-fullstack-3e0l.onrender.com/api/cart", {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          console.log(data);
          setCartItems(data);
        } catch (err) {
          setError(err.message || "Error fetching cart items");
        }
      }
    };

    fetchCartItems();
  }, []);

  //   delete item from cart
  const handleDelete = async (productId) => {
    console.log("Product to delete", productId)
    const token = localStorage.getItem("token")
    try {
      await fetch(`https://ecommerce-fullstack-3e0l.onrender.com/api/cart/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log('Previous Item', cartItems);
      console.log('Product ID to remove', productId)
      setCartItems((cartItems) => cartItems.filter((item) => item.id !== productId));
    } catch (err) {
      setError(err.message);
    }
  };

  // change quantity of items in cart
  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      await fetch(`https://ecommerce-fullstack-3e0l.onrender.com/api/cart/${productId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      setCartItems(
        cartItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (cartItems.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <p>{item.name}</p>
            <img
              src={item.img}
              alt={item.name}
              // style={{ width: "100px", height: "100px" }}
            />
            <p>${item.price}</p>
            <div>Quantity:</div>
            {/* <p>Quantity: {item.quantity}</p> */}
            <input className="cartQuantityBox"
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) =>
                handleQuantityChange(item.id, parseInt(e.target.value))
              }
              min="1"
            />
            <p><button onClick={() => handleDelete(item.id)}>
              Delete
            </button></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
