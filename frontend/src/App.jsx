import CartBtn from "./components/CartBtn";
import Banner from "./components/Banner";
import { useEffect, useState, useRef } from "react";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import ProductPage from "./components/ProductPage";
import ShoppingCart from "./components/ShoppingCart";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderConfirmation from "./components/OrderConfirmation";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const productsRef = useRef(null);

  function addToLocalStorage(product) {
  const localStorageCart = localStorage.getItem("cart");
  const savedCart = JSON.parse(localStorageCart) || [];

  const existingItem = savedCart.find(
    (item) => item.firestoreId === product.firestoreId
  );

  const updatedCart = existingItem
    ? savedCart.map((item) =>
        item.firestoreId === product.firestoreId
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    : [...savedCart, { ...product, quantity: 1 }];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  useEffect(() => {
    const updateCart = () => {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
    };

  updateCart();

  window.addEventListener("cartUpdated", updateCart);

  return () => {
    window.removeEventListener("cartUpdated", updateCart);
  };
}, []);

  return (
    <Router>
      <div>
        <Navbar
          products={products}
          setFilteredProducts={setFilteredProducts}
          cartCount={cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
        />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner
                  onShopNow={() => {
                    setFilteredProducts(products);
                    if (productsRef.current) {
                      productsRef.current.scrollIntoView({
                        behavior: "smooth",
                      });
                    }
                  }}
                />

                <main
                  ref={productsRef}
                  style={{ padding: "2rem", marginTop: "1rem" }}
                >
                  <Products
                    products={filteredProducts}
                    cart={cart}
                    setCart={setCart}
                  />
                </main>
              </>
            }
          />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route
            path="/products/:id"
            element={
              <ProductPage
                products={products}
                onAddToCart={(product) => {
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