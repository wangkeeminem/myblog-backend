const router = require('./router')
const express = require('express')
const path = require('path')
const app = express()

const port = 8080

app.set('views', path.join(__dirname, 'views'));//设置默认路径
app.use('/public/',express.static(path.join(__dirname,'./public/')))
console.log(path.join(__dirname,'./public/'));
app.use('/node_modules',express.static(path.join(__dirname,'./node_modules/')))


app.all('*', function (req, res, next) {
  //其中*表示允许所有域可跨
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended:true}));

app.use(router)

app.listen(port, () => console.log(`Example app listening on port port!`))