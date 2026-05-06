import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Btn from "./Btn";
import CartAmountBtn from "./CartAmountBtn";
import PriceTotalCheckout from "./PriceTotalCheckout";
import ProductCard from "./ProductCard";
import CheckoutBtn from "./CheckoutBtn";
import { useCreateOrderMutation } from "./../api/ShoppingApi";

// cartItems innehåller hela kundvagnen (array av produkter)
// handleChangeQty skickas ner för att kunna uppdatera eller ta bort produkter
function ShoppingCart({ handleChangeQty, cartItems }) {
  const navigate = useNavigate();
  const createOrder = useCreateOrderMutation();

const handleCheckout = () => {
  if (!cartItems.length || createOrder.isPending) return;

  const user = JSON.parse(localStorage.getItem("user"));

  const order = {
    customer: user?.name || "Guest User",
    customerId: user?.id || null,
    items: cartItems.map((item) => ({
      id: item.firestoreId,
      image: item.image,
      name: item.name,
      qty: item.quantity || 1,
      price: item.price,
    })),
    price: cartItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    ),
    createdAt: new Date().toISOString(),
  };

  createOrder.mutate(order, {
    onSuccess: (data) => {
      // Clear actual parent cart state
      cartItems.forEach((item) => {
        handleChangeQty(item.firestoreId, 0);
      });

      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));

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
      <Btn btnClassName="order-history-btn"
            spanText="Order history"
            onClick={() => navigate("/orders")}></Btn>

      {cartItems.length === 0 ? (
        <div className="cart-empty-state">
          <p>Your cart is empty!</p>
          <p>Items you add to your cart will be shown here.</p>

          <Btn
            btnClassName="shopNowBtn"
            onClick={() => navigate("/")}>
              Shop Now
          </Btn>
        </div>
      ) : (
        <div className="cart-items-list">
          {cartItems.map((item, index) => (
            <div className="cart-item-row" key={item.firestoreId}>
              <ProductCard product={item} />

              <CartAmountBtn
                qty={item.quantity || 1}
                onChangeQty={(newQty) =>
                  handleChangeQty(item.firestoreId, newQty)
                }
              />
            </div>
          ))}

          <PriceTotalCheckout cart={cartItems} />

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
