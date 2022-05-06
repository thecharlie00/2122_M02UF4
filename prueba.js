re("http");
  
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
	 
 
      let col_data = db.collection(col).find();

	  col_data.toArray(function(err, data){
      let string= JSON.stringify(data);
	  response.end(string)
	  });


http.createServer(function(request, response){
	res.writeHead(200);

	if (request.url == "/"){
		fs.readFile("index.html", function (err, data){
			response.writeHead(200, {"Content-Type": "text/html"});
			response.end(data);
		});

		return;
	}


	let url = request.url.split("/");


	if (url.length == 2){
		send_data_list(db, request, response);

		return;
	}

	if (url[2].length != 24){
		response.end();
		return;
	}

	if (url[1] == "characters"){
		let obj_id = new ObjectId(url[2]);

		let col_data = db.collection("characters").find({"_id":obj_id},{projection: {_id:1, name:1}});

		col_data.toArray(function(err, data){
			let string = JSON.stringify(data);

			response.end(string);

		});
	}
	else if (url[1] == "items") {
		let obj_id = new ObjectId(url[2]);

		let col_data = db.collection("items").find({"_id":obj_id},{projection: {_id:1, item:1}});

		col_data.toArray(function(err, data){
			let string = JSON.stringify(data);

			response.end(string);
	});
}
 
  }).listen(1095);
 
