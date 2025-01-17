
const express = require('express')
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./config/passportConfig')
const routes = require('./routes/index.js');
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(session({
  secret: 'your-secret-key',  
  resave: false,              
  saveUninitialized: true,       
}));
app.use(passport.initialize());
app.use(passport.session());


app.use("/", routes);

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
