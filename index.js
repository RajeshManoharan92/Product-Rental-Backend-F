const express = require('express')
const cors = require('cors');
const mongo = require('./shared')
const noderouter = require('./router/node')

// to connect express

const app = express();

app.use(express.json());

app.use(cors());

// to call mongodb connect function

mongo.connect();

// API

app.use('/product', noderouter);

// to create server

app.listen(process.env.PORT || 3000, () => {
  console.log("server running on portal 3000")
})
