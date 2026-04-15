import express from "express";

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

export default router;