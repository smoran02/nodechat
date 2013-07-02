var http = require('http');
var fs = require('fs');

server = http.createServer(function(request, response){
    response.writeHead(200);
    var newFile = fs.createWriteStream("newfile.jpg"));
    var fileBytes = request.headers["content-length"];
    var uploadedBytes = 0;

    request.pipe(newFile);

    request.on('data', function(chunk){
        uploadedBytes += chunk.length;
        var progress = uploadedBytes / fileBytes * 100;
        response.write(parseInt(progress, 10) + '%\n');
    });

    request.on('end', function(){
        response.end('Upload complete.\n');
    });
}).listen(8080);

