import Search from "./Search";
import CartBtn from "./CartBtn";
import HamburgerMenu from "./HamburgerMenu";
import { useNavigate } from "react-router-dom";
function Navbar({ products, setFilteredProducts, onCartClick, cartCount }) {
  const navigate = useNavigate();
  const handleFilter = (category) => {
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
        <div className={`cart-wrapper ${cartCount > 0 ? "cart-active" : ""}`}>
          {" "}
          <CartBtn onClick={onCartClick} count={cartCount} />
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
