import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

function Products({ products = [] }) {
  return (
    <section className="products-page">
      <div className="products-grid">
        {products.map((product) => (
          <Link
            key={product.firestoreId}
            to={`/products/${product.firestoreId}`}
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
