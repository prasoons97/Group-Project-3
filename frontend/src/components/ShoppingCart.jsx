import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Btn from "./Btn";
import ProductCard from "./ProductCard";
import CheckoutBtn from "./CheckoutBtn";
import { useCreateOrderMutation } from "./../api/ShoppingApi";

function ShoppingCart() {
    const navigate = useNavigate();
    const createOrder = useCreateOrderMutation();

    const [cartItems] = useState(() => {
     const savedCart = localStorage.getItem("cart");
     return savedCart ? JSON.parse(savedCart) : [];
  });

  const handleCheckout = () => {
    const order = {
      customer: "Tia Ria Sina", // replace with real user later
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        qty: item.quantity || 1,
      })),
      price: cartItems.reduce((sum, item) => sum + item.price, 0),
    };

    console.log("Order being sent:", order);

    createOrder.mutate(order, {
      onSuccess: (data) => {
        localStorage.removeItem("cart");
        navigate("/order-confirmation", {
          state: { orderId: data?.id || data?.orderId },
        });
      },
      onError: (error) => {
        console.error("Order failed:", error);
      },
    });
  };

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
          {cartItems.map((item, index) => (
            <div className="cart-item-row" key={index}>
              <ProductCard product={item} />
            </div>
          ))}
          <p></p>
          <CheckoutBtn
            onClick={handleCheckout}
            disabled={createOrder.isPending}
          />
          {createOrder.isPending && <p>Placing your order...</p>}
          {createOrder.isError && <p>Something went wrong, try again!</p>}
        </div>
      )}
    </section>
  );
}

export default ShoppingCart;