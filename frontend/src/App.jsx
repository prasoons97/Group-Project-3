import CartBtn from "./components/CartBtn";
import Banner from "./components/Banner";
import { useEffect, useState } from "react";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import ProductPage from "./components/ProductPage";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import CheckoutBtn from "./components/CheckoutBtn";

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
    <Router>
      <div>
        <Navbar
          products={products}
          setFilteredProducts={setFilteredProducts}
          cartCount={cart.length}
          onCartClick={() => console.log("Go to cart")}
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
              </>
            }
          />
          <CheckoutBtn onClick={() => console.log("Checkout clicked")} />
        </main>
      </>
    }
  />

  <Route
    path="/products/:id"
    element={
      <ProductPage
        products={products}
        cart={cart}
        setCart={setCart}
      />
    }
  />

          <Route
            path="/products/:id"
            element={
              <ProductPage 
              products={products} 
              onAddToCart={(product) => {
                setCart([...cart, product]);
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
