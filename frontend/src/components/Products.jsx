import ProductCard from "./ProductCard";

function Products({ products = [] }) {
  return (
    <section className="products-page">
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.firestoreId} product={product} />
        ))}
      </div>
    </section>
  );
}

export default Products;
