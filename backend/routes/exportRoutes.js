const express = require("express");
const router = express.Router();

const Export = require("../schemas/exportSchema");

router.post("/add", async (req, res) => {

    try {
//     foodId, exportDate,  quantity
        const { foodId, exportsData, quantity } = req.body;

        if (!foodId || !exportsData || !quantity) {
            return res.status(404).json({ message: 'Fill out some missing fields' });
        }

        const newExport = await Export.create({ foodId, exportsData, quantity });

        return res.status(200)

    } catch (error) {
        res.json(error);
    }

});

router.get("/", async (req, res) => {

    const exportsData = await Export.find().populate("foodId");

    res.json(exportsData);
});

module.exports = router;