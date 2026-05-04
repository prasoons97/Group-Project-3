import { Link } from "react-router-dom"; // 
import ProductCard from "./ProductCard";

// Tar emot products som props
function Products({ products = [] }) {
  return (
    <section className="products-page">
      {/* Container för alla produkter*/} 
      <div className="products-grid">

        {/* Loopar igenom alla produkter och renderar en ProductCard för varje */}
        {products.map((product) => (

          // Link gör hela kortet klickbart och navigerar till produktsidan
          <Link
            key={product.firestoreId} // Unikt id för varje produkt
            to={`/products/${product.firestoreId}`} // Dynamisk URL baserat på produktens id
            className="product-card-link"
            >
              {/* Skickar produkten som prop till ProductCard */}
              <ProductCard product={product} />
              </Link>
        ))}
      </div>
    </section>
  );
}

export default Products;
