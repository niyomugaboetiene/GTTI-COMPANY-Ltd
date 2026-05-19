const express = require("express");
const router = express.Router();

const Manager = require("../schemas/managerSchema");

router.post("/register", async (req, res) => {

    try {
        const { userName, password } = req.body;

        if (!userName || !password) {
            return res.status(404).json({ message: 'Fill out some missing fields' });
        }

        const newManager = await Manager.create({ userName, password });

        return res.status(201).json({ mesdage: 'New Manager added', manager: newManager });

    } catch (error) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

});

router.get("/", async (req, res) => {
   try {
        const importData = await Import.find().populate("foodId");

        return res.status(200).json({ messsage: 'Import list', import: importData });
   } catch (err) {
    console.error(err);
     return res.status(500).json({ message: 'Internal server error' });
   }
});

module.exports = router;