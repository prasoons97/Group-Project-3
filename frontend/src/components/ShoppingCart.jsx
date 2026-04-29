import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Btn from "./Btn";
import CartAmountBtn from "./CartAmountBtn";
import PriceTotalCheckout from "./PriceTotalCheckout";
import ProductCard from "./ProductCard";
import CheckoutBtn from "./CheckoutBtn";
import { useCreateOrderMutation } from "./../api/ShoppingApi";

function ShoppingCart() {
    const navigate = useNavigate();
    const createOrder = useCreateOrderMutation();

    const [cartItems, setCartItems] = useState(() => {
     const savedCart = localStorage.getItem("cart");
     return savedCart ? JSON.parse(savedCart) : [];
  });

function handleChangeQty(firestoreId, newQty) {
  const updatedCart =
    newQty === 0
      ? cartItems.filter((item) => item.firestoreId !== firestoreId)
      : cartItems.map((item) =>
          item.firestoreId === firestoreId ? { ...item, quantity: newQty } : item
        );

  setCartItems(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  window.dispatchEvent(new Event("cartUpdated"));
}
  const handleCheckout = () => {
    const order = {
      customer: "Tia Ria Sina", // replace with real user later
      items: cartItems.map((item) => ({
        id: item.firestoreId,
        name: item.name,
        qty: item.quantity || 1,
      })),
      price: cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0),
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
            <div className="cart-item-row" key={item.firestoreId}>
              <ProductCard product={item} />

              <CartAmountBtn
              qty={item.quantity || 1}
              onChangeQty={(newQty) => handleChangeQty(item.firestoreId, newQty)}
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