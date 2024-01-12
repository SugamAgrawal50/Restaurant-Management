require('dotenv').config();
const express = require('express');
const client = require('./config/redisconfig');
const app = express();
var bodyParser = require('body-parser')

const cors = require('cors')
const { errorHandler } = require('./controllers/errorHandler');

const connectDB = require('./config/dbConn');
const appRoute = require('./routes/approute')

connectDB();
client.connect();

var jsonParser = bodyParser.json()
app.use(jsonParser)
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser)

app.use(cors());
app.use('/dish',appRoute )

app.all('*', errorHandler);

client.on('error', err => console.log('Redis Client Error', err));

module.exports = app //for testing