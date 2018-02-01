var formidable = require('formidable');
var fs = require('fs');

exports.upload = function(request, response) {

	console.log("Rozpoczynam obsługę żądania upload.");
	var form = new formidable.IncomingForm();
	form.parse(request, function(error, fields, files) {

		console.log(fields.title);
		fs.renameSync(files.upload.path, fields.title + ".png");
		response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
		response.json({title: fields.title});
		response.write("received image:<br/>");
		response.write("<img src='/show' />");
		response.end();

	});

}

exports.welcome = function(request, response) {

	console.log("Rozpoczynam obsługę żądania welcome.");
	fs.readFile('templates/start.html', function(err, html) {

		response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
		response.write(html);
		response.end();

	});

}

exports.show = function(request, response) {
	console.log(request, response);
	
	fs.readFile("./tres.png", "binary", function(error, file) {
		
		// console.log(file);
		response.writeHead(200, {"Content-Type": "image/png"});
		response.write(file, "binary");
		response.end();

	});

}

exports.error = function(request, response) {

	console.log("Nie wiem co robić.");
	response.write("404 :(");
	response.end();

}