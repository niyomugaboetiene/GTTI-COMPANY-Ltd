const express = require("express");
const router = express.Router();

const Food = require("../schemas/foodSchema");

function isManager(req, res, next) {
    if (!req.session.manager) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
}

router.post("/add", isManager, async (req, res) => {

    try {
//         foodName  foodOwnerName
        const { foodName, foodOwnerName } = req.body;

        if (!foodName || !foodOwnerName) {
            return res.status(404).json({ message: 'Fill out some missing fields' });
        }

        const newFood = await Food.create({ foodName, foodOwnerName });

        return res.status(201).json({ mesdage: 'New food added', food: newFood });

    } catch (error) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

});

router.get("/", isManager, async (req, res) => {
   try {
        const foodData = await Food.find();

        return res.status(200).json({ messsage: 'Food list', food: foodData });
   } catch (err) {
    console.error(err);
     return res.status(500).jsone({ message: 'Internal server error' });
   }
});

router.get("/get/:id", isManager, async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);

        if (!food) {
            return res.status(404).json({ message: "Food not found" });
        }

        return res.status(200).json({ food });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/update/:id", isManager, async (req, res) => {
    try {
        const { foodName, foodOwnerName } = req.body;

        const food = await Food.findById(req.params.id);

        if (!food) {
            return res.status(404).json({ message: "Food not found" });
        }

        const updatedFood = await Food.findByIdAndUpdate(
            req.params.id,
            {
                foodName,
                foodOwnerName
            },
            { new: true }
        );

        return res.status(200).json({
            message: "Food updated successfully",
            food: updatedFood
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/delete/:id", isManager, async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);

        if (!food) {
            return res.status(404).json({ message: "Food not found" });
        }

        await Food.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            message: "Food deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;