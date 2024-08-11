import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";    
import Stripe from 'stripe';    

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order form frontend
const placeOrder = async (req, res) => {  

    const frontend_url = process.env.FRONTEND_URL || "http://localhost:5174" //5173
    try {
        const newOrder = orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address    
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}});

        const line_items = req.body.items.map(item => ({
        
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                     //   images: [item.image],
                    },
                    unit_amount: item.price * 100
                },
                quantity: item.quantity
            }));

            line_items.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Delivery Charges',
                    },
                    unit_amount: 2*100
                },
                quantity: 1
            }); 

            const session = await stripe.checkout.sessions.create({
                line_items: line_items,
                mode: 'payment',
                success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
                cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
            });

            res.json({success:true, session_url: session.url});
        

    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error:Failed to place order"});
    }

}

//Logic to verify order from frontend (can use webhooks for this)

const verifyOrder = async (req, res) => {
    const {orderId, success} = req.body;
    try{
        if(success == "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            res.json({success:true, message: "Paid:Order verified"});
    }
    else{
        await orderModel.findByIdAndDelete(orderId);
        res.json({success:false, message: "Not Paid:Order verification failed"});

    }
}
    catch(error){
        console.log(error);
        res.json({success:false, message: "Error:Failed to verify order"});
    }


}

//User orders for frontend 
const userOrders = async (req, res) => {
   try {
    const orders = await orderModel.find({userId:req.body.userId}); //user id from auth middleware  
    res.json({success:true, data:orders});

    
   } catch (error) {
         console.log(error);
         res.json({success:false, message: "Error:Failed to get orders"});
    
   }
}

//Listing orders for admin Panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true, data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error:Failed to get orders list"});
    }
   
}

//api for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status});
        res.json({success:true, message: "Order status updated"});
    }
    catch (error) {
        console.log(error);
        res.json({success:false, message: "Error:Failed to update order status"});
    }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };