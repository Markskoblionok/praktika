var Busboy = require('busboy');

module.exports = function (app, fs) {
    app.post('/files', function (request, response) {
        var busboy = new Busboy({headers: request.headers});
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
        });
        busboy.on('finish', function() {
            console.log('Upload complete');
            response.writeHead(200, { 'Connection': 'close' });
            response.end("That's all folks!");
        });
        return request.pipe(busboy);
    })
};