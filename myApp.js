console.log("Hello World");
let dotenv = require('dotenv');
let bodyParser = require('body-parser');
let express = require('express');
let app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use("/public", express.static(__dirname + "/public"))
app.use(function(req, res, next){
    const method = req.method;
    const path = req.path;
    const ip = req.ip;

    console.log(method + " " + path + " " + ip);
});

app.get("/json", function(req, res) {
    res.json({"message": process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello JSON"});
});
app.get("/",function(req,res){
    const absolutePath = __dirname+ "/views/index.html";
    res.sendFile(absolutePath);
})
app.get("/now", function(req, res, next){
    req.time = new Date().toString();
    next();
}, function(req, res){
    res.json({time: req.time});
});
app.get("/:word/echo", function(req, res, next){
    res.json({echo: req.params.word});
});
app.get("/name", function(req, res, next){
    const firstname = req.query.first;
    const lastname = req.query.last;
    res.json({name: firstname + " " + lastname});
});


































 module.exports = app;
