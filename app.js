// const express = require("express");
// const routes = require("./routes/index.js");
// // const userRoutes = require("./routes/users.js");
// const app = express();
// // const session = require("express-session");

// app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: true }));
// // app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));

// app.use((req, res, next) => {
//   req.user = {
//     id: 1,
//     username: "JohnDoe",
//     email: "john@example.com",
//     role: "Admin",
//   };
//   next();
// });

// app.use("/", routes);
// // app.use("/", userRoutes);

// const PORT = 3000;
// app.listen(PORT, () =>
//   console.log(`Server running on http://localhost:${PORT}`)
// );

const express = require("express");
const routes = require("./routes/index.js"); // Main routes including /profile
const app = express();

// Set up the view engine
app.set("view engine", "ejs");

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to simulate a logged-in user
app.use((req, res, next) => {
  console.log("Middleware executed: setting req.user");
  req.user = {
    id: 1,
    username: "JohnDoe",
    email: "john@example.com",
    role: "Admin",
  };
  next();
});

// Use the main routes
app.use("/", routes);

// Start the server
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
