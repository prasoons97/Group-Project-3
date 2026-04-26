import Search from "./Search";
import CartBtn from "./CartBtn";
import HamburgerMenu from "./HamburgerMenu";
function Navbar({ products, setFilteredProducts, onCartClick, cartCount }) {
  const handleFilter = (category) => {
    if (category === "ALLA") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category?.toLowerCase() === category.toLowerCase(),
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <HamburgerMenu onFilter={handleFilter} />
      </div>
      <div className="navbar-logo">W O R N</div>
      <div className="navbar-right">
        <Search products={products} setFilteredProducts={setFilteredProducts} />
        <CartBtn onClick={onCartClick} count={cartCount} />
      </div>
    </nav>
  );
}
export default Navbar;