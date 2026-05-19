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
        const importData = await Import.find().populate("foodId");

        return res.status(200).json({ messsage: 'Import list', import: importData });
   } catch (err) {
    console.error(err);
     return res.status(500).json({ message: 'Internal server error' });
   }
});

router.get("/get/:id", async (req, res) => {
    try {
        const importItem = await Import.findById(req.params.id)
            .populate("foodId");

        if (!importItem) {
            return res.status(404).json({ message: "Import not found" });
        }

        return res.status(200).json({
            import: importItem
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const { foodId, importDate, quantity } = req.body;

        const importItem = await Import.findById(req.params.id);

        if (!importItem) {
            return res.status(404).json({ message: "Import not found" });
        }

        const updatedImport = await Import.findByIdAndUpdate(
            req.params.id,
            {
                foodId,
                importDate,
                quantity: Number(quantity)
            },
            { new: true }
        );

        return res.status(200).json({
            message: "Import updated successfully",
            import: updatedImport
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const importItem = await Import.findById(req.params.id);

        if (!importItem) {
            return res.status(404).json({ message: "Import not found" });
        }

        await Import.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            message: "Import deleted successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;