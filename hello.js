var http = require('http');
var url = require('url');
var fs =require('fs');
var mysql = require('mysql');
//Create A Connection
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "nodeDB",
})

//Connect TO MYSQL
con.connect(function(err){
	if(err) throw err
	console.log("Connected to Database!");
	/*con.query("CREATE DATABASE nodeDB", function(err,result){
		if(err) throw err;
		console.log("Database create")
	})*/

	//create Table 

	/*var sql = "CREATE TABLE customers(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255))";
	con.query(sql,function(err,result){
		if(err) throw err;
		console.log("TABLE HAS BEEN CREATED");
	})*/
	//Alter Table
	/*var sql = "ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
	con.query(sql,function(err,result){
		if(err) throw err;
		console.log(result);
		console.log("table has bee altered ");
	})*/

	//INSERTING DATA INTO TABLE
	/*var sql="INSERT INTO customers (name ,email) VALUES ('Walker' , 'walker@gmail.com') ";
	con.query(sql,function(err,result){
		if(err) throw err;
		console.log(result+"\nData has been inserted...");
	})*/

	//inserting multipla data at time
	/*var sql = "INSERT INTO customers (name, email) VALUES ?";
	var values=[
		['tim','tim@tim.com'],
		['sam','sam@sam.com'],
		['tina','tina@tina.com'],
		['Laura','Laura@Laura.com'],
	]
	con.query(sql,[values],function(err,result){
		if(err) throw err;
		console.log(result + "\n MULTIPAL DATA HAS BEEN INSERTED\n"+ "Records INSERTED: "+ result.affectedRows);
	})*/

	//displaying data
	/*var sql = "SELECT * FROM `customers` ";
	con.query(sql,function(err,result, fields){
		if(err) throw err;
			console.log("ID | NAME 	| EMAIL");
			console.log("-----------------------------------");
		for(var i=0 ; i<result.length;i++){
			console.log(result[i].id+"  | "+result[i].name+" 	| "+result[i].email);
		}
	})*/

	//where clause and LIKE
	var sql = "SELECT * FROM customers WHERE email LIKE '%s%' ";
	con.query(sql,function(err,result){
		if(err) throw err;
		console.log(result);
	})	
});

const PORT = process.env.PORT || 5000


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
}).listen(PORT);