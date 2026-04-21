function ProductCard({ product}) {
    return (
        <article className="product-card">
            {product.image && (
                <img
                className="product-card_image"
                src={product.image}
                alt={product.name}
                />
            )}

            <h2 className="product-card_title">{product.name}</h2>
            <p className="product-card_description">{product.description}</p>
            <p className="product-card_price">{product.price} kr</p>
        </article>
    )
}

export default ProductCard;