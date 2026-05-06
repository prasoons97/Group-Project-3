import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Btn from "./Btn";

function OrderConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId } = location.state || {}; // get orderId passed from ShoppingCart
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate loading for 2 seconds then show confirmation
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="shopping-cart-page">
      <div className="cart-empty-state">
        {loading ? (
          // loading state
          <>
            <p>Placing your order...</p>
            <div className="progress-bar">
              <div className="progress-fill" />
            </div>
          </>
        ) : (
          //  confirmation state
          <>
            <p>Your order has been placed!</p>
            <p>Order ID: {orderId}</p>
            <Btn
              btnClassName="shopNowOrderConfirmationBtn"
              onClick={() => navigate("/")}>
              Shop now
            </Btn>
          </>
        )}
      </div>
    </section>
  );
}

export default OrderConfirmation;
