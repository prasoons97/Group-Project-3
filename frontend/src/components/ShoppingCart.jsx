import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Btn from "./Btn";
import ProductCard from "./ProductCard";

function ShoppingCart() {
    const navigate = useNavigate();

    const [cartItems] = useState(() => {
     const savedCart = localStorage.getItem("cart");
     return savedCart ? JSON.parse(savedCart) : [];
  });

  return (
    <section className="shopping-cart-page">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="cart-empty-state">
            <p>Your cart is empty!</p>
            <p>Items you add to your cart will be shown here.</p>

            <Btn
                btnClassName="shop-now-btn"
                spanText="SHOP NOW"
                onClick={() => navigate("/")}
            />
        </div>
        ) : (
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <div className="cart-item-row" key={item.firestoreId}>
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ShoppingCart;