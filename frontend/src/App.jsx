import Banner from "./components/Banner";
import { useEffect, useState, useRef } from "react";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import ProductPage from "./components/ProductPage";
import ShoppingCart from "./components/ShoppingCart";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderConfirmation from "./components/OrderConfirmation";
import OrderHistory from "./components/OrderHistory";
import {
  getLocalStorageCart,
  saveLocalStorageCart,
  addToCart,
  countCartItems
} from "./utils/cartUtils";

function App() {
  const [products, setProducts] = useState([]);
  const savedCart = getLocalStorageCart();
  const [cart, setCart] = useState(savedCart);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const productsRef = useRef(null);

  function handleAddToCart(product) {
    const updatedCart = addToCart(product, cart);
    setCart(updatedCart);
    saveLocalStorageCart(updatedCart);
  }

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  function handleChangeQty(firestoreId, newQty) {
    const updatedCart =
      newQty === 0
        ? cart.filter((item) => item.firestoreId !== firestoreId)
        : cart.map((item) =>
            item.firestoreId === firestoreId
              ? { ...item, quantity: newQty }
              : item,
          );

    setCart(updatedCart); // Carten uppdateras så ny rendering körs
    saveLocalStorageCart(updatedCart); // Sparar uppdaterad kundkorg till LocalStorage
  }

  return (
    <Router>
      <div>
        <Navbar
          products={products}
          setFilteredProducts={setFilteredProducts}
          cart={cart}
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
                  <Products products={filteredProducts} />
                </main>
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <ShoppingCart
                handleChangeQty={handleChangeQty}
                cartItems={cart}
              />
            }
          />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route
            path="/products/:id"
            element={
              <ProductPage products={products} onAddToCart={handleAddToCart} />
            }
          />

          <Route path="/orders" element={<OrderHistory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
