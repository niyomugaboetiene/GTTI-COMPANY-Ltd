const express = require("express");
const mongoose = require("mongoose");
const exportRoute = require("./routes/exportRoutes.js");
const importRoute = require("./routes/importRoutes.js")
const foodRoute = require("./routes/foodRoutes.js");
const managerROute = require("./routes/managerRoutes.js")
const cors = require("cors");
const session = require("express-session");

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(session({
    resave: false,
    secret: 'my_secret_key',
    saveUninitialized: true,
    cookie: { httpOnly: false, maxAge: 60 * 100 * 1000 },
}))

mongoose.connect("mongodb://127.0.0.1:27017/GTTI")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.use("/manager", managerROute);
app.use("/foods", foodRoute);
app.use("/import", importRoute);
app.use("/export", exportRoute);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});