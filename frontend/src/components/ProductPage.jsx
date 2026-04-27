import { useState } from "react";
function ProductPage({ product, onAddToCart }) {
    if (!product) return <p>No product selected</p>

    const images = product.images ? product.images : [product.image, product.image, product.image];

    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <section className="product-page">
            <div className="product-page-left">
                <img
                    className="product-page-main-image"
                    src={selectedImage}
                    alt={product.name}
                />

                <div className="product-page-thumbnails">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`${product.name} ${index + 1}`}
                            onClick={() => setSelectedImage(image)}
                            style={{ cursor: "pointer", width: "80px" }}
                        />
                    ))}
                </div>
            </div>

            <div className="product-page-right">
                <h1>{product.name}</h1>

                <p>{product.description}</p>
                <p>This product is made for everyday use and has a comfortable fit. It is easy to match with various outfits and works well for different occasions.</p>

                <p>{product.price} kr</p>

                <button className="add-to-cart-btn" type="button" onClick={() => onAddToCart?.(product)}>Add to Cart</button>


            </div>
        </section>
    )
}

export default ProductPage;