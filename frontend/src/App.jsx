import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Products from "./Products";
import CartBtn from './components/CartBtn';
import Banner from './components/Banner';



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
      <Banner></Banner>
    </div>
  );
}

export default App;