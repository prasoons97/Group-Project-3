import express from 'express';
import { getProducts } from './products.js';

const app = express();

app.get('/products', async (req, res) => {
    try {
        const products = await getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }

});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
