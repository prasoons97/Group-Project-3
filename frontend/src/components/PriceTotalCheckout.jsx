export default function PriceTotalCheckout({ cart }) {

  // Calculate total price, multiply each item's price by quantity and sum up
  const totalPrice = cart.reduce((sum, item) => {
    return sum + item.price * (item.quantity || 1);
    // item.price = price for product
    // item.quantity = how many of the product 
    // || 1 = fallback if quantity is not defined (counts as 1)
  }, 0);

  return (
    <div>
      {/* Shows the calculated total price */}
      <h3>Total: {totalPrice} kr</h3>
    </div>
  );
}