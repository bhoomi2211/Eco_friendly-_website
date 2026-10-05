require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

require("./connection");

const UserRouter = require("./routers/UserRouter");
const ProductRouter = require("./routers/ProductRouter");
const OrderRouter = require("./routers/OrderRouter");
const ContactRouter = require("./routers/ContactRouter");

const port = process.env.PORT || 5000;

app.use(cors({
    origin: [
        "http://localhost:3000",
        process.env.FRONTEND_URL
    ]
}));

app.use(express.json());

app.use("/user", UserRouter);
app.use("/product", ProductRouter);
app.use("/order", OrderRouter);
app.use("/contact", ContactRouter);

app.get("/", (req, res) => {
    res.send("response from express");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});