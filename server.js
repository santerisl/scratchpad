'use strict'
var express = require('express')
var app = express()
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors')
var storage = require('node-persist');
var PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

var distDir = __dirname + "/dist/scratchpad/";
console.log(distDir)
app.use(express.static(distDir));

storage.init().then(() => {
  //app.use(express.static(path.join(__dirname, 'dist')));
  app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`)
    await storage.setItem('test', 'hello 2')
  })
})

app.get("/api", (req, res) => {
  storage.getItem('test').then((data) => {
    console.log(data)
    res.send({ data: data });
  }).catch(() => {
    res.send({ error: 'not found' })
  })
});
