const express = require("express");
const router = express.Router();

const Export = require("../schemas/exportSchema");

router.post("/add", async (req, res) => {

    try {

        const exportedFood = new Export(req.body);

        await exportedFood.save();

        res.json(exportedFood);

    } catch (error) {
        res.json(error);
    }

});

router.get("/", async (req, res) => {

    const exportsData = await Export.find().populate("foodId");

    res.json(exportsData);
});

module.exports = router;