const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));

mongoose.connect("mongodb://127.0.0.1:27017/GTTI")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.use("/manager", require("./routes/managerRoutes"));
app.use("/foods", require("./routes/foodRoutes"));
app.use("/imports", require("./routes/importRoutes"));
app.use("/exports", require("./routes/exportRoutes"));

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});