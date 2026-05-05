import { useState } from "react";
import Search from "./Search";

function HamburgerMenu({ onFilter, products, setFilteredProducts }) {
  const [open, setOpen] = useState(false);

  const handleClick = (category) => {
    onFilter(category);
    setOpen(false);
  };

  return (
    <div>
      <button className="hamburger-btn" onClick={() => setOpen(!open)}>
        {open ? "✕" : "☰"}
      </button>

      {open && (
        <>
          <div className="hamburger-overlay" onClick={() => setOpen(false)} />
          <div className="hamburger-drawer">
            {/* Search bar inside the drawer for mobile users */}
            <div className="drawer-search">
              <Search products={products} setFilteredProducts={setFilteredProducts} />
            </div>
            {["ALLA", "HERR", "DAM", "BARN"].map((cat) => (
              <span key={cat} className="menu-item" onClick={() => handleClick(cat)}>
                {cat}
              </span>
            ))}
            <div className="drawer-footer">
              <p>© 2026 WORN</p>
              <p>Alla rättigheter förbehållna</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default HamburgerMenu;