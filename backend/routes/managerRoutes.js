const express = require("express");
const router = express.Router();

const Manager = require("../schemas/managerSchema");

router.post("/register", async (req, res) => {

    try {

        const manager = new Manager(req.body);

        await manager.save();

        res.json(manager);

    } catch (error) {
        res.json(error);
    }

});

router.post("/login", async (req, res) => {

    const { userName, password } = req.body;

    try {

        const manager = await Manager.findOne({
            userName,
            password
        });

        if (!manager) {
            return res.json({
                message: "Invalid username or password"
            });
        }

        res.json({
            message: "Login successful",
            manager
        });

    } catch (error) {
        res.json(error);
    }

});

module.exports = router;