const express = require("express");
const router = express.Router();

const Food = require("../schemas/foodSchema");

router.post("/add", async (req, res) => {

    try {

        const food = new Food(req.body);

        await food.save();

        res.json(food);

    } catch (error) {
        res.json(error);
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