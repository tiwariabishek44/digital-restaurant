const express = require("express");
const ProudctMOdel = require("../models/product");
const productRouter = express.Router();

//add product
productRouter.post('/proudct', async (req, res) => {
    

    try {
        const { productname, price } = req.body;
        let proudct = new ProudctMOdel({
            productname,
            price
        });

        proudct = await proudct.save();
        res.status(200).send(proudct);
        
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
});

//get product
productRouter.get('/get-product', async (req, res) => {
    try {
        const product = await ProudctMOdel.find();
        res.json(product);
    } catch (e) {
        res.status(500).json({error:e.message})
    }

});

productRouter.delete('/delete-product', async (req, res) => {
    try {

        const id = req.body;
        let prdelete = await ProudctMOdel.findOneAndDelete({
            _id: id,
        });
        res.json(prdelete)
        

    }
    catch (e) {
        res(500).json({error:e.message})
    }
})

module.exports = productRouter;