import { useParams } from "react-router-dom";


function ProductPage({ products = [], onAddToCart }) {
    const { id } = useParams();

    const product = products.find(
        (product) => product.firestoreId === id
    );

    if (!product) return <p>No product selected</p>

    const images = product.images
        ? product.images
        : [product.image, product.image, product.image];


    return (
        <section className="product-page">
            <div className="product-page-left">
                {images.map((image, index) => (
                    <img
                        key={index}
                        className="product-page-scroll-image"
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                    />
                ))}
            </div>

            <div className="product-page-right">
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p>{product.price} kr</p>
                <button className="add-to-cart-btn" type="button" onClick={() => onAddToCart?.(product)}>
                    Add to Cart
                </button>
            </div>
        </section>
    )
}

export default ProductPage;