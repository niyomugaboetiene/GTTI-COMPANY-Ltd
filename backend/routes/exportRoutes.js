const express = require("express");
const router = express.Router();

const Export = require("../schemas/exportSchema");
const Import = require("../schemas/importSchema.js");

router.get("/get/:id", async (req, res) => {
    try {
        const exportItem = await Export.findById(req.params.id)
            .populate("foodId");

        if (!exportItem) {
            return res.status(404).json({ message: "Export not found" });
        }

        return res.status(200).json({ export: exportItem });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

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

        if (isQuantityExist.quantity < Number(quantity)) {
            return res.status(403).json({ message: `You dont have this quantity in stock` });
        }
          
        const updatedQuantity = isQuantityExist.quantity - Number(quantity);
        await Import.findOneAndUpdate({foodId}, { quantity: updatedQuantity }, { new: true })
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
router.put("/update/:id", async (req, res) => {
    try {
        const { foodId, exportDate, quantity } = req.body;

        const exportItem = await Export.findById(req.params.id);

        if (!exportItem) {
            return res.status(404).json({ message: "Export not found" });
        }

        const importStock = await Import.findOne({ foodId });

        if (!importStock) {
            return res.status(404).json({ message: "No stock found" });
        }

        const quantityNum = Number(quantity);

        const restoredStock = importStock.quantity + exportItem.quantity;

        if (restoredStock < quantityNum) {
            return res.status(403).json({
                message: "Not enough stock for update"
            });
        }

        const finalStock = restoredStock - quantityNum;

        await Import.findOneAndUpdate(
            { foodId },
            { quantity: finalStock },
            { new: true }
        );

        const updatedExport = await Export.findByIdAndUpdate(
            req.params.id,
            {
                foodId,
                exportDate,
                quantity: quantityNum
            },
            { new: true }
        ).populate("foodId");

        return res.status(200).json({
            message: "Export updated successfully",
            export: updatedExport
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;