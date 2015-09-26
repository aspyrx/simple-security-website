var express = require('express');
var app = express();

var bb = require('express-busboy');
bb.extend(app, {
    upload: true
});

var http = require('http').Server(app);
var fs = require('fs');

var uploadsDir = __dirname + '/dist/uploads/';
fs.stat(uploadsDir, function (err, stats) {
    if (err) {
        fs.mkdir(uploadsDir, function(err) {
            if (err) {
                throw err;
            }
        });
    }
});


app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/dist/index.xhtml');
});

app.put('/upload/photo', function(req, res) {
    var tmpFile = req.files.photo.file;
    fs.readFile(tmpFile, function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).end();
            return;
        }

        var outFile = uploadsDir + req.files.photo.filename;
        fs.writeFile(outFile, data, function(err) {
            if (err) {
                console.log(err);
                res.status(500).end();
                return;
            }

            fs.unlink(tmpFile, function(err) {
                if (err) {
                    console.log(err);
                    res.status(500).end();
                    return;
                }

                fs.readdir(uploadsDir, function(err, files) {
                    while (files.length > 15) {
                        fs.unlink(uploadsDir + files[0], function(err) {
                            console.log(err);
                            return;
                        });
                    }
                });

                console.log(outFile);
                res.json({ name: req.files.photo.filename });
            });
        });
    });
});

app.get('/list/photo', function(req,res) {
    fs.readdir(uploadsDir, function(err, files) {
        res.json(files);
    });
});

http.listen(8003, function() {
    console.log('listening on *:8003');
});

