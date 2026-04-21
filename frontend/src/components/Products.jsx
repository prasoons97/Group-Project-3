import { useEffect, useState } from "react";
import Search from "./Search";
import ProductCard from "./ProductCard";

function Products() {
  // State för att lagra produkter
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // Körs när komponenten laddas
  useEffect(() => {
    // Hämtar produkter från backend
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  return (
    <section className="products-page">
      
      <Search products={products} setFilteredProducts={setFilteredProducts} />

      <div className="products-grid">
        {filteredProducts.map((product) => (
            <ProductCard key={product.firestoreId} product={product} />
        ))}
      </div>
    </section>
   );
  }

export default Products;