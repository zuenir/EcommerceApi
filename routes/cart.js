const router = require("express").Router();
const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

//CREATE
router.post("/", verifyToken, async(req, res)=>{
    const newCart = new Cart(req.body);

    try {
        const saveCart = await new Cart.save();
        res.status(200).status(saveCart);
    } catch (err) {
        res.status(500).json(err);  
    }
});

//UPDATE 
router.put("/:id", verifyTokenAndAuthorization,async (req, res)=> {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new:true});
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization,async (req, res)=> {
  try {
      await Cart.findByIdAndDelete(res.params.id);
      res.status(200).json("Cart has been deleted...");
  } catch (err) {
      res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/:userId",verifyTokenAndAuthorization, async(req,res) =>{
  try {
      const cart = await Cart.findById({userID: res.params.userId});
      res.status(200).json(cart);
  } catch (err) {
      res.status(500).json(err);
  }
});

//GET ALL
router.get("/",verifyTokenAndAdmin, async(req,res) =>{
  try {
      const carts = await Cart.find();
      res.status(200).json(carts);
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;