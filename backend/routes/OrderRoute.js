import express from 'express';  
import authMiddleware from '../middleware/auth.js';
import { placeOrder, verifyOrder, userOrders, listOrders, updateStatus} from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.post('/userorders', authMiddleware, userOrders);

//Admin Panel
orderRouter.post('/status', updateStatus);
orderRouter.get('/list', listOrders);



export default orderRouter;