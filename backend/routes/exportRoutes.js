const express = require("express");
const router = express.Router();

const Export = require("../schemas/exportSchema");
const Import = require("../schemas/importSchema.js");

router.post("/add", async (req, res) => {

    try {
        const { foodId, exportDate, quantity } = req.body;

        if (!foodId || !quantity) {
            return res.status(404).json({ message: 'Fill out some missing fields' });
        }

        console.log("Food id", foodId);
        const isQuantityExist = await Import.findOne({ foodId: foodId });

        console.log(isQuantityExist);

        if (!isQuantityExist) {
            return res.status(404).json({ message: 'No product in the stock' });
        }

        if (isQuantityExist.quantity < quantity) {
            return res.status(403).json({ message: `You dont have this quantity in stock` });
        }
          
        isQuantityExist.quantity = quantity;
        const newExport = await Export.create({ foodId, exportDate, quantity });


        return res.status(201).json({ mesdage: 'New export added', export: newExport });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }

});

router.get("/", async (req, res) => {
   try {
        const exportsData = await Export.find().populate("foodId");

        return res.status(200).json({ messsage: 'Export list', export: exportsData });
   } catch (err) {
    console.error(err);
     return res.status(500).jsone({ message: 'Internal server error' });
   }
});

module.exports = router;