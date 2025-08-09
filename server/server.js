const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require('path');

dotenv.config()
connectDB();

const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
 res.send("Report system api running..")
});

// all Routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const reportRoute= require('./routes/reportRoute')
app.use('/api', reportRoute);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const commentRoutes = require("./routes/commentRoutes");
app.use('/api', commentRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {console.log
    (`server is running at http://localhost:${PORT}`)})