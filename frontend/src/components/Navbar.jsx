import Search from "./Search";
import HamburgerMenu from "./HamburgerMenu";
import CartBtn from "./CartBtn";
import { Link, useNavigate } from "react-router-dom";
import { countCartItems } from "../utils/cartUtils";

function Navbar({ products, setFilteredProducts, cart }) {
  const cartCount = countCartItems(cart);
  const navigate = useNavigate(); 
  const handleFilter = (category) => {
    navigate("/")
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

  return (
    <nav className="navbar">
      <div className="navbar-left mobile-only">
        <HamburgerMenu onFilter={handleFilter} />
      </div>
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

      <div className="navbar-logo">W O R N</div>

      <div className="navbar-right">
        <div className="search-wrapper">
          <Search
            products={products}
            setFilteredProducts={setFilteredProducts}
          />
        </div>
          {" "}
          <CartBtn onClick={() => navigate("/cart")} count={cartCount} />
        </div>
    </nav>
  );
}
export default Navbar;
