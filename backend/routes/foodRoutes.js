const express = require("express");
const router = express.Router();

const Food = require("../schemas/foodSchema");


router.post("/add", async (req, res) => {

    try {
//         foodName  foodOwnerName
        const { foodName, foodOwnerName } = req.body;

        if (!foodName || !foodOwnerName) {
            return res.status(404).json({ message: 'Fill out some missing fields' });
        }

        const newFood = await Food.create({ foodId, exportsData, quantity });

        return res.status(201).json({ mesdage: 'New food added', food: newFood });

    } catch (error) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

});

router.get("/", async (req, res) => {

    const foods = await Food.find();

    res.json(foods);
});

router.put("/update/:id", async (req, res) => {

    try {

        const updatedFood = await Food.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedFood);

    } catch (error) {
        res.json(error);
    }

});

router.delete("/delete/:id", async (req, res) => {

    try {

        await Food.findByIdAndDelete(req.params.id);

        res.json({
            message: "Food deleted"
        });

    } catch (error) {
        res.json(error);
    }

});

module.exports = router;