import { useParams } from "react-router-dom";


function ProductPage({ products = [], onAddToCart }) { // Tar emot produkter och onAddToCart-funktion som props
    const { id } = useParams(); // Hämtar produkt-id från URL:en

    const product = products.find( // Hittar produkten som matchar id:t
        (product) => product.firestoreId === id // Använder firestoreId som identifierare
    );

    if (!product) return <p>No product selected</p> 

    const images = product.images// Om produkten har flera bilder, använd dem, annars duplicera den enda bilden för att fylla layouten
        ? product.images// Om det finns bilder, använd dem
        : [product.image, product.image, product.image];// Om det inte finns bilder, skapa en array med tre kopior av den enda bilden


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