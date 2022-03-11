//Express APP Initialization
const express = require("express");

//Environment variables
const dotenv = require("dotenv").config();

//HTTP HEADER: Cross-Origin Resource Sharing (Secure XMLHTTPRequest/Fetch API)
const cors = require("cors");

//Shorthand file-pathing
const path = require("path");

//Bcrypt, use ASYNC (Hash/Encrypt data)
const bcrypt = require('bcrypt');

//Postgres SQL (Pool: uses environment variables (.env) for connection info)
const {Pool, Client} = require('pg');

//Knex Configuration Object (Interface with Postgres SQL Database)
//Client is Postgres SQL, so 'pg'
const DB_API = require('knex')({
  client: 'pg',
  connection: process.env.POSTGRES_URI
  // {
  //   host: process.env.POSTGRES_HOST,
  //   user: process.env.POSTGRES_USER,
  //   password: process.env.POSTGRESS_PASS,
  //   database: process.env.POSTGRESS_DB
  // }
});

//CREATE APP
const app = express();

//More cors config
const whitelist = ['http://localhost:3001']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

//CONFIGURE APP w/ MIDDLEWARE
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//FILEPATH FOR FILES TO SERVE (REACT: build file)
app.use(express.static(path.join(__dirname, '../client/build')));

//Import Controller Modules
const register_Controller = require('./controllers/register.js');
const login_Controller = require('./controllers/login.js');

//Home
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', "index.html"));
});

//Login
app.post('/login_submit', (req, res) => {
  login_Controller.login(req, res, DB_API, bcrypt);
});

//Register
app.post("/register_submit", (req, res) => {
  register_Controller.register(req, res, DB_API, bcrypt);
});

//PORT SERVER IS LISTENING ON
app.listen(process.env.PORT || 3000, () => {
  console.log('Server Started');
});