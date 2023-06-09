const express = require("express");
const auth = require("../midileware/auth")
const customerRouter = express.Router();
const { Deal } = require("../models/deal_model")
const {PromiseProvider} = require("mongoose")
const User = require("../models/users");
const Order = require("../models/orders")

//get all your deals

customerRouter.get("/customer/get_deals", auth,  async (req, res) => {
    try {
        const deals = await Deal.find({});
        res.json(deals);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
})


//create order

customerRouter.post("/customer/add-order", auth , async (req, res) => {
    try {
        const id = req.body;
        const deal = await Deal.findById(id);
        let order = new Order({
            owner: req.user, 
            merchant: deal.owner,
            deal: deal,
        })

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
})

//get order
customerRouter.get("/customer/get-cupons", auth, async (req, res) => {
    try {
        const dealss = await Order.find({
            owner: `${req.user}`
        });
        res.json(dealss);

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = customerRouter;