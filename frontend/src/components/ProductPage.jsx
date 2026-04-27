import { useParams } from "react-router-dom";

function ProductPage({ products = [] }) {
  const { id } = useParams();

  const product = products.find(
    (product) => product.firestoreId === id
  );

  if (!product) return <p>Product not found</p>;

  return (
    <section className="product-page">
      <img src={product.image} alt={product.name} />

      <h1>{product.name}</h1>

      <p>{product.description}</p>

      <p>{product.price} kr</p>
    </section>
  );
}

export default ProductPage;