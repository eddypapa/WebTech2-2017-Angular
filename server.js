var http = require("http");
var fs = require("fs");
var bodyParser = require('body-parser');
var express = require('express');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get("/parts", function(req,res){
	fs.readFile(__dirname+"/parts.json","utf8",function(err,data){
	res.send(data);
	});
});

app.post("/addPart", function(req,res){
	var parts = JSON.parse(fs.readFileSync(__dirname+"/parts.json"));
	parts.push(req.body);
	fs.writeFile(__dirname+"/parts.json",JSON.stringify(parts),function(err){
		res.send(err);
	});
});

app.get("/deletePart", function(req, res){
	if(req.query == undefined){
		return;
	}
	if(req.query['name'] == undefined){
		res.send();
		return;
	}
	var parts = JSON.parse(fs.readFileSync(__dirname+"/parts.json"));
	
	parts = parts.filter(function(part){ return part.name != req.query['name'] });
	console.log(parts);
	fs.writeFile(__dirname+"/parts.json",JSON.stringify(parts),function(err){
		if(err != null){
		console.log(err);
		}
	});
	res.send();
});



var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
