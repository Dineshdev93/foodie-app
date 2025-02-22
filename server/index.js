const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors({
  origin: 'http://192.168.168.13:3000', // React app's URL
}));
app.use(express.json());
require("dotenv").config();
const colors = require("colors");
const port = 8000;
require("./DB/conn");



// User routes
const userRoutes = require("./routes/users/userAuthenticate");
app.use("/userAuth/api", userRoutes);

// recipes routes
const recipeRoutes = require("./routes/recepies/recipeRoutes");
app.use("/recipes/api", recipeRoutes);

// review routes
const reviewRoutes = require("./routes/reviews/reviewRoute");
app.use("/review/api", reviewRoutes);

app.listen(port, () => {
  console.log(`Server start at port number ${port}`.italic.bgYellow.bold);
});
