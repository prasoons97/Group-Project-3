import { useState } from 'react'
import Products from "./components/Products";
import CartBtn from './components/CartBtn';

function App() {

  const [cart, setCart] = useState([]);
  
  return (
    <div>
       <CartBtn
        count={cart.length}
        onClick={() => {
          console.log("Go to cart");
        }}
      />
      <Products />
    </div>
  );
}

export default App;