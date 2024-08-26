import express from 'express';

import { deleteProducts, getProducts, postProducts, putProducts } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getProducts);

router.post('/', postProducts);

// console.log(process.env.MONGO_URI);

router.put('/:id', putProducts);

router.delete('/:id', deleteProducts)

export default router;