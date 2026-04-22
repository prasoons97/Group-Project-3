import CartBtn from './components/CartBtn';
import Banner from './components/Banner';
import { useEffect, useState } from "react";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import ProductPage from "./components/ProductPage";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  return (
    <div>
      <ProductPage product={filteredProducts[0]} />
      <Navbar
        products={products}
        setFilteredProducts={setFilteredProducts}
        cartCount={cart.length}
        onCartClick={() => console.log("Go to cart")}
      />
    
<Banner></Banner>
<Products />
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
