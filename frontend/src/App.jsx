import { useState } from "react";
import Products from "./Products";
import Navbar from "./components/Navbar";

function App() {
  const [cart, setCart] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  return (
    <div>
      <Navbar
        products={[]}
        setFilteredProducts={setFilteredProducts}
        cartCount={cart.length}
        onCartClick={() => console.log("Go to cart")}
      />

      <main
        style={{
          padding: "2rem",
          marginTop: "1rem",
        }}
      >
        <Products products={filteredProducts} cart={cart} setCart={setCart} />
      </main>
    </div>
  );
}

export default App;
