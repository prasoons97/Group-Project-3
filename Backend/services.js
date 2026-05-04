import express from "express";
import { db } from "./firebase.js";
import { collection, getDocs, addDoc, Timestamp, doc, deleteDoc } from "firebase/firestore";

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, "products"));

   const products = snapshot.docs.map((doc) => ({
  firestoreId: doc.id,
  ...doc.data(),
}));

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
  
});

router.get("/api/orders", async (req, res) => { // For the order history!
  try {
    const snapshot = await getDocs(collection(db, "orders"))
    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString()
    }))
    res.status(200).json(orders)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to fetch orders" })
  }
});

router.post("/api/orders", async (req, res) => {
  const { customer, items, price } = req.body;

  if (!customer || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "customer and items are required" });
  }

  try {
    const orderRef = await addDoc(collection(db, "orders"), {
      customer,
      items,
      price,
      status: "created",
      createdAt: Timestamp.now(),
    });

    res.status(201).json({ orderId: orderRef.id, status: "created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save order" });
  }
});

router.delete("/api/orders/:id", async (req, res) => {
    const id = req.params.id.trim();

    try {
        const docRef = doc(db, "orders", id);
        await deleteDoc(docRef);
        res.status(200).json({ message: "Order deleted successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete order"});
    }
});

export default router;
