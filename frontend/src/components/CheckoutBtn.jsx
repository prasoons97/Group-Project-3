import Btn from "./Btn";

function CheckoutBtn({ onClick }) {
  return (
    <Btn onClick={onClick} spanText="Checkout" btnClassName="checkout-btn" />
  );
}

export default CheckoutBtn;
