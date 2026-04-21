import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Products from "./Products";
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