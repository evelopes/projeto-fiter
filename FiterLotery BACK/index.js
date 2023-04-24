const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

const API = process.env.DB_Lottery;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
const cors = require('cors');
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  req.header('Access-Control-Allow-Origin', '*');
  req.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  req.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


const sorteiosRoutes = require("./routes/sorteiosRoutes");
app.use("/sorteios", sorteiosRoutes);

const ticketsRoutes = require("./routes/ticketsRoutes");
app.use("/tickets", ticketsRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes);

const compareRoutes = require("./routes/compareRoutes")
app.use("/compare", compareRoutes)



mongoose
  .connect(`${API}`)
  .then(() => {
    console.log("Conectado ao mongoDB db_Lottery");
    app.listen(3001)
  })
  .catch((err) => {
    console.error(err);
  });

