require("dotenv").config();
const express = require("express");
const connectDB = require("./database/db");
const app = express();
const PORT = process.env.PORT || 3001;
const user = require("./models/userModel");
const router = require("./routes/authRoutes");
const homeRoute = require("./routes/homeRoutes");
const adminRoutes = require("./routes/adminRoutes");
const imageRoutes = require("./routes/imageRoutes");
const cors = require("cors");
const loginUserRoutes = require("./routes/loginUserRoutes");

app.use(cors());

app.use(express.json());

//dbconnneciton

connectDB();

app.use("/api/auth", router);
app.use("/api/home", homeRoute);
app.use("/api/admin", adminRoutes);
app.use("/api/image", imageRoutes);
app.use("/api/home", loginUserRoutes);

app.use("/", (req, res) => {
  res.send("This is home");
});

app.listen(PORT, () => {
  console.log(`Server listingin on PORT ${PORT}`);
});
