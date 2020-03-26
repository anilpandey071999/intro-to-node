var http = require('http');
var url = require('url');
var fs =require('fs');

http.createServer(function(req,res){
	var q = url.parse(req.url,true);
	console.log(q.pathname);
	var fileName = "." + q.pathname;
	console.log(fileName);
	if(fileName == './'){
		fileName = './index';
	}
	fileName += '.html'; 
	fs.readFile(fileName,function(err,data){
		if(err){
			res.writeHead(404, {'Content-Type': 'text/html'});
			return res.end("404 NOT FOUND");
		}
		//else{
			res.writeHead(200,{'Content-Type': 'text/html'});
			//console.log("...Incoming call"+ req.url);
			res.write(data);
			res.end();
		//}
		
	})
}).listen(8080);