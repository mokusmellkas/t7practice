const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();
const cors = require('cors');

const PORT = 8000;
app.use(cors())
app.use('/form', express.static(path.join(__dirname, '../frontend/index.html')));
app.use('/pub', express.static(path.join(__dirname, '../frontend/public'))); 

// default options
app.use(fileUpload());

app.get('/ping', function(req, res) {
  res.send('pong');
});

app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.userfile;

  uploadPath = __dirname + '/upload/' + sampleFile.name;

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send('File uploaded to ' + uploadPath);
  });
});




app.listen(PORT, function() {
  console.log('Express server listening on port ', PORT); // eslint-disable-line
});
