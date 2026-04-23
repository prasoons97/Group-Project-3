import Search from "./Search";
import CartBtn from "./CartBtn";

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
        <span onClick={() => handleFilter("ALLA")}>ALLA</span>
        <span onClick={() => handleFilter("HERR")}>HERR</span>
        <span onClick={() => handleFilter("DAM")}>DAM</span>
        <span onClick={() => handleFilter("BARN")}>BARN</span>
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
