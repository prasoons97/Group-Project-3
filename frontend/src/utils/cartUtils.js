export function getLocalStorageCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

export function saveLocalStorageCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(product, cart) {
    const existingItem = cart.find(
        (item) => item.firestoreId === product.firestoreId
    );

    if (existingItem) {
        return cart.map((item) => 
            item.firestoreId === product.firestoreId
                ? { ...item, quantity: (item.quantity || 1) + 1 }
                : item
    );
}

    return [...cart, { ...product, quantity: 1}];
}

export function countCartItems(cart) {
    let count = 0;

    for (let i = 0; i < cart.length; i++) {
      count = count + cart[i].quantity;
    }

    return count;
  }
