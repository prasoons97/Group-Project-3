function ProductPage ({ product }) {
    if (!product) return <p>No product selected</p>
    return (
        <section className="product-page">

            <img src={product.image} alt={product.name} />

            <h1>{product.name}</h1>

            <p>{product.description}</p>

            <p>{product.price} kr</p>

        </section>
    )
}

export default ProductPage;