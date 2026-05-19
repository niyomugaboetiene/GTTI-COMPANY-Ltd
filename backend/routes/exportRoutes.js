const express = require("express");
const router = express.Router();

const Export = require("../schemas/exportSchema");

router.post("/add", async (req, res) => {

    try {
//     foodId, exportDate,  quantity
        const { foodId, exportsData, quantity } = req.body;

        if (!foodId || !exportsData || !quantity) {

        }

    } catch (error) {
        res.json(error);
    }

});

router.get("/", async (req, res) => {

    const exportsData = await Export.find().populate("foodId");

    res.json(exportsData);
});

module.exports = router;