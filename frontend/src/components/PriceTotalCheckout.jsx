// Komponent som visar totalpriset för produkter i kundvagnen
export default function PriceTotalCheckout({ cart }) {

  // Räknar ut totalpris genom att summera alla produkters price
  const totalPrice = cart.reduce((sum, item) => {
    return sum + item.price;
  }, 0);

  return (
    <div>
      {/* Visar totalpriset */}
      <h3>Total: {totalPrice} kr</h3>
    </div>
  );
}

