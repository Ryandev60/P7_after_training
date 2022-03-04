const express = require("express");
const app = express();
const path = require("path");
const postRoutes = require("./routes/post.routes");
const userRoutes = require("./routes/user.routes");
const commentRoutes = require("./routes/comment.routes");
const likeRoutes = require("./routes/like.routes");
const cors = require ('cors');
require('dotenv').config();


const db = require("./models");
//Following lines are to make sure our app can parse the json data
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(cors());
app.use((req, res, next) => { // On l'applique sur toutes les routes
  res.setHeader("Access-Control-Allow-Origin", "*"); // On Autorise tout le monde à acceder à notre API
  res.setHeader( // On donne l'autorisation de pouvoir utiliser certains headers sur response
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader( //  On donne l'autorisation de pouvoir utiliser certaines méthodes
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next(); // On passe l'éxécution au middleware suivant
});

//On dit à l'application express de servir le dossier images
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/like", likeRoutes);




db.sequelize.sync();

module.exports = app;
