import Search from "./Search";
import CartBtn from "./CartBtn";

function Navbar({ products, setFilteredProducts, onCartClick, cartCount }) {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        borderBottom: "1px solid #ddd",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "1.5rem",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        <span>ALLA</span>
        <span>HERR</span>
        <span>DAM</span>
        <span>BARN</span>
      </div>

      <div
        style={{
          flex: 1,
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        W O R N
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Search products={products} setFilteredProducts={setFilteredProducts} />

        <CartBtn onClick={onCartClick} count={cartCount} />
      </div>
    </nav>
  );
}

export default Navbar;
