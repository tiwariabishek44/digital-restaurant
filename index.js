const express = require("express");
const app = express();
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');
const customerRouter = require("./routes/customer");
const merchantRouter = require("./routes/merchant");
const DB = "mongodb+srv://tiwariabishek44:3o5c5Z2JMzVsfvgb@cluster0.pr7tq2k.mongodb.net/nearbydeals?retryWrites=true&w=majority"


mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  });
app.use(express.json());
app.use(authRouter)
app.use(customerRouter);
app.use(merchantRouter);

app.listen(3000, "0.0.0.0", () => {
    console.log("connect tat the port 3000")
})