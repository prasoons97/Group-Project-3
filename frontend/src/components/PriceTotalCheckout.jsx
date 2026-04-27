export default function PriceTotalCheckout({ cart }) {

  // Skapar en variabel som räknar ut totalpriset
  // reduce går igenom varje produkt (item) i cart
  // sum börjar på 0 och vi adderar varje produkts pris
  const totalPrice = cart.reduce((sum, item) => {
    return sum + item.price * (item.quantity || 1);
    // item.price = pris för produkten
    // item.quantity = hur många av produkten (t.ex. 2 jeans)
    // || 1 = fallback om quantity inte finns (räknar som 1)
  }, 0);

  return (
    <div>
      {/* Visar det uträknade totalpriset */}
      <h3>Total: {totalPrice} kr</h3>
    </div>
  );
}

