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
        const managerData = await Manager.find();

        return res.status(200).json({ messsage: 'Manager list', manager: managerData });
   } catch (err) {
    console.error(err);
     return res.status(500).json({ message: 'Internal server error' });
   }
});

module.exports = router;