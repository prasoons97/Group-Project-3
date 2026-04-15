import express from "express";
import { db } from "./firebase.js";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const router = express.Router();
router.get('/products', async (req, res) => {
    try {
        const products = [
            {
                id: 1,
                name: "T-shirt",
                price: 199,
                category: "Clothes"
            },
            {
                id: 2,
                name: "Jeans",
                price: 499,
                category: "Clothes"
            },
            {
                id: 3,
                name: "Sneakers",
                price: 999,
                category: "Footwear"
            }
        ];
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send('Failed to fetch products');
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

export default router;
