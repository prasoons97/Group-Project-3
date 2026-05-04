import { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

function Products({ products = [] }) {
  const [sortOption, setSortOption] = useState("");// State för att lagra vald sorteringsoption

  const normalizePrice = (price) => { // Normaliserar priset så att det kan jämföras oavsett format
    if (typeof price === "number") return price;
    if (typeof price === "string") {
      const normalized = price.replace(/[^\d.,-]/g, "").replace(",", ".");// Försöker tolka det som ett flyttal
      const parsed = Number.parseFloat(normalized);// Om priset inte kan tolkas som ett nummer, returnera 0
      return Number.isNaN(parsed) ? 0 : parsed;// Om priset är negativt, returnera 0
    }
    return 0;
  };

  //Sorteringslogik
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "price-low")
      return normalizePrice(a.price) - normalizePrice(b.price); 
    if (sortOption === "price-high")
      return normalizePrice(b.price) - normalizePrice(a.price);
    if (sortOption === "a-z")
      return (a.name || "").localeCompare(b.name || "");
    if (sortOption === "z-a")
      return (b.name || "").localeCompare(a.name || "");
    return 0; // Ingen sortering
  });

  return (
    <section className="products-page">
      <div className="sort-products">
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}> 
          <option value="">Sort by</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="a-z">Name: A-Z</option>
          <option value="z-a">Name: Z-A</option>
        </select>
      </div>
      {/* PRODUCTS GRID */}
      <div className="products-grid"> 
        {sortedProducts.map((product) => (
          <Link
            key={product.firestoreId}// Använder firestoreId som nyckel
            to={`/products/${product.firestoreId}`}// Länkar till produktens detaljsida
            className="product-card-link"
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Products;
