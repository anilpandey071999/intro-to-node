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
	/*var sql = "SELECT * FROM customers WHERE email LIKE '%s%' ";
	con.query(sql,function(err,result){
		if(err) throw err;
		console.log(result);
	})	*/
	//or 
	/*var sql = "SELECT * FROM customers WHERE email LIKE ? or id = ?";
	var name_search = "%s%";
	var id_search = 1;
	con.query(sql,[name_search,id_search],function(err,result){
		if(err) throw err;
		console.log(result);
	})*/	
	//and
	/*var sql = "SELECT * FROM customers WHERE email LIKE '%w%' AND id = 1";
	con.query(sql,function(err,result){
		if(err) throw err;
		console.log(result);
	})	*/
	//order by ascending 
	/*var sql = " SELECT * from customers order by name asc";
	con.query(sql,function(err,result){
		if(err) throw err;
		console.log(result);
	})*/

	//order by descending
	/*var sql = " SELECT * from customers order by name desc";
	con.query(sql,function(err,result){
		if(err) throw err;
		console.log(result);
	})*/

	//deleating from table
	/*var sql = "DELETE FROM customers where id = 4";
	con.query(sql,function(err,result){
		if(err) throw err;
		console.log(result);
	})*/

	//update the record
	/*var sql = "update customers set name = 'sam' where id = 3 ";
	con.query(sql,function(err,result){
		if(err) throw err;
		console.log(result);
	})*/
	//limit
	/*var sql = "SELECT * FROM customers order by id desc limit 1,4";
	con.query(sql,function(err,result){
		if(err) throw err;
		console.log(result);
	})*/
	//drop table
	var sql = "DROP table customers";
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