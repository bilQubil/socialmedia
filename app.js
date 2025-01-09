
const express = require('express')
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./config/passportConfig')
const routes = require('./routes/index.js');
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'your-secret-key',  
  resave: false,              
  saveUninitialized: true,    
  cookie: { secure: false }   
}));
app.use(passport.initialize());
app.use(passport.session());


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
