import { useEffect, useState } from "react";

function Products() {
  // State för att lagra produkter
  const [products, setProducts] = useState([]);

  // Körs när komponenten laddas
  useEffect(() => {
    // Hämtar produkter från backend
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Products</h1>

      {/* Loopar igenom alla produkter */}
      {products.map((product) => (
        <div
          key={product.firestoreId}
          style={{
            marginBottom: "2rem",
          }}
        >
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          )}

          <p style={{ color: "gray" }}>{product.category}</p>

          <h2>{product.name}</h2>

          <p style={{ fontWeight: "bold" }}>{product.price} kr</p>

          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Products;