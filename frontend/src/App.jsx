import CartBtn from "./components/CartBtn";
import Banner from "./components/Banner";
import { useEffect, useState } from "react";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import ProductPage from "./components/ProductPage";
import ShoppingCart from "./components/ShoppingCart";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CheckoutBtn from "./components/CheckoutBtn";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  function addToLocalStorage(product) {
    const localStorageCart = localStorage.getItem("cart");
    const savedCart = JSON.parse(localStorageCart);
    const updatedCart = [...savedCart, product];

    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  return (
    <Router>
      <div>
        <Navbar
          products={products}
          setFilteredProducts={setFilteredProducts}
          cartCount={cart.length}
        />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />

                <main
                  style={{
                    padding: "2rem",
                    marginTop: "1rem",
                  }}
                >
                  <Products
                    products={filteredProducts}
                    cart={cart}
                    setCart={setCart}
                  />
                </main>
                <CheckoutBtn onClick={() => console.log("Checkout clicked")} />
              </>
            }
          />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route
            path="/products/:id"
            element={
              <ProductPage
                products={products}
                onAddToCart={(product) => {
                  setCart([...cart, product]);
                  addToLocalStorage(product);
                }}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
