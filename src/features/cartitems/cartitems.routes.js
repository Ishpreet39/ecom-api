// Manage routes/paths to ProductCntroller

// 1. Import express.
import express from 'express';
import  { CartItemsController }  from './cartitems.controller.js';

// 2. Initialize Express router.
const cartRouter = express.Router();

const cartController = new CartItemsController();

cartRouter.delete('/:id',cartController.delete);
cartRouter.post('/', cartController.add);
cartRouter.get('/', cartController.get);

export default cartRouter;