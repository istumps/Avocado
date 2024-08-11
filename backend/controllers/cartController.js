import userModel from '../models/userModel.js'; 

// add itenms to cart 
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData; 
        if(!cartData[req.body.itemId])
        {
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success: true, message: 'Item added to cart'});
    } catch (error) {
        console.error(error);
        res.json({success: false, message: 'Error: Unable to add item to cart'});
    }
}

// remove items from cart
const removeFromCart = async (req, res) => {

    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0)
        {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success: true, message: 'Item removed from cart'});
    } catch (error) {
        console.error(error);
        res.json({success: false, message: 'Error: Unable to remove item from cart'});
        
    }
    
    }

// fetchCart

const getCart = async (req, res) => {   
    try {
        let userData = await userModel.findById(req.body.userId);   
        let cartData = await userData.cartData;
        res.json({success: true, cartData});
    } catch (error) {
        console.error(error);
        res.json({success: false, message: 'Error: Unable to fetch cart'});
    }


}


export { addToCart, removeFromCart, getCart };