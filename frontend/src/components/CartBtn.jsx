import Btn from "./Btn";

// cart-button that shows the number of items in the cart and navigates to the cart page when clicked
function CartBtn({onClick, count = 0 }) {
    return (
    <Btn
    btnClassName ="cartBtn"
    // what happens when clicked (example: go to cart)
    onClick={onClick} 
    // shows icon + count if there are products in the cart
    spanText={count > 0 ? `🛒 (${count})` : `🛒`} 
    />
    );

}

export default CartBtn;