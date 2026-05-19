const express = require("express");
const router = express.Router();

const Import = require("../schemas/importSchema");

router.post("/add", async (req, res) => {

    try {
//     foodId, importDate,  quantity
        const { foodId, importDate, quantity } = req.body;

        if (!foodId || !importDate || !quantity) {
            return res.status(404).json({ message: 'Fill out some missing fields' });
        }

        const newImport = await Import.create({ foodId, importDate, quantity });

        return res.status(201).json({ mesdage: 'New import added', import: newImport });

    } catch (error) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

});

router.get("/", async (req, res) => {
   try {
        const importData = await Export.find().populate("foodId");

        return res.status(200).json({ messsage: 'Import list', import: importData });
   } catch (err) {
    console.error(err);
     return res.status(500).json({ message: 'Internal server error' });
   }
});

module.exports = router;