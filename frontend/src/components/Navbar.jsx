import Search from "./Search";
import HamburgerMenu from "./HamburgerMenu";
import CartBtn from "./CartBtn";
import { Link, useNavigate } from "react-router-dom";
import { countCartItems } from "../utils/cartUtils";

function Navbar({ products, setFilteredProducts, cart }) {
  const cartCount = countCartItems(cart);
<<<<<<< 78-mobile-responsive
  const navigate = useNavigate();

  const handleFilter = (category) => {
    navigate("/");
=======
  const navigate = useNavigate(); 

  const handleFilter = (category) => {
>>>>>>> main
    if (category === "ALLA") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category?.toLowerCase() === category.toLowerCase(),
      );
      setFilteredProducts(filtered);
    }
    navigate("/");
  };

  // resets all filters and goes to home — used by logo click
    const handleLogoClick = () => {
      console.log("Logo clicked — resetting filters"); 
    setFilteredProducts(products);
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* mobile — hamburger */}
      <div className="navbar-left mobile-only">
        {/* Pass products and setFilteredProducts to HamburgerMenu for mobile search */}
        <HamburgerMenu
          onFilter={handleFilter}
          products={products}
          setFilteredProducts={setFilteredProducts}
        />
      </div>

      {/* desktop — category links */}
      <div className="navbar-left desktop-only">
        {["ALLA", "DAM", "HERR", "BARN"].map((cat) => (
          <span
            key={cat}
            className="nav-category"
            onClick={() => handleFilter(cat)}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* logo — always navigates to home and resets filters */}
      <div className="navbar-logo" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        W O R N
      </div>

        {/* right side — search and cart */}
      <div className="navbar-right">
        <div className="search-wrapper">
          <Search
            products={products}
            setFilteredProducts={setFilteredProducts}
          />
        </div>
        <CartBtn onClick={() => navigate("/cart")} count={cartCount} />
      </div>
    </nav>
  );
}
export default Navbar;