#!/usr/bin/node


let http = require("http");
  
   let mongo_client = require("mongodb").MongoClient;
  
   let url = "mongodb://localhost/";
  
   let db;

   let fs = require("fs");
 
  console.log("Iniciando script mongo-http");
 
 mongo_client.connect(url, function(error, conn){
      console.log("Dentro de MongoDB");
 
     if (error){
          console.log("ERROR!!!");
          return;
      }
 
      db = conn.db("tffhd");
 
  });
 
 
 http.createServer(function(request, response){
      response.writeHead(200);

	  if(request.url == "/"){
	    
		  fs.readFile("index.html", function(err, data){
		  	   response.writeHead(200, {"Content-Type": "text/html"});
			   response.end(data);


			});

			return;
	  	
	  }

      let col = "";

	  if(request.url == "/characters"){
        col = "characters";
	  }else if(request.url = "/items"){
        col = "items"
	  }else{
	  response.end();
	   return;
	   }

      let saludo = "<h1> TFFHD </h1>";
	 
 
      let characters = db.collection("characters").find();

	  characters.toArray(function(err, data){
      let characters_string= JSON.stringify(data);
	  response.end(characters_string)
	  });
 
  }).listen(1095);
 
