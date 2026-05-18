const express = require("express");
const router = express.Router();

const Import = require("../schemas/importSchema");

router.post("/add", async (req, res) => {

    try {

        const importedFood = new Import(req.body);

        await importedFood.save();

        res.json(importedFood);

    } catch (error) {
        res.json(error);
    }

});

router.get("/", async (req, res) => {

    const imports = await Import.find().populate("foodId");

    res.json(imports);
});

module.exports = router;