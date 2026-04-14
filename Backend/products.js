import { db } from './firebase.js';
import { collection, getDocs } from "firebase/firestore";

export const getProducts = async () => {
    try {
        const querySnapshot = await
            getDocs(collection(db, "products"))

        const products = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        return products
    } catch (error) {
        console.error("Error getting products:", error);
        return [];
    }
}