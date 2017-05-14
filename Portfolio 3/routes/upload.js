const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const middleware = require('../middleware');

const router = express.Router();

router.get('/', middleware.isSignedIn, function(req, res) {
  res.render('upload');
});

router.post('/', middleware.isSignedIn, function(req, res) {
  let form = new formidable.IncomingForm();
  form.multiples = true;

  // Store uploads in the /uploads/{username} directory
  let uploadPath = path.join(__dirname, '../uploads/' + req.user.username);

  // If the upload path doesn't exist, create it
  if (!fs.existsSync(uploadPath)){
    fs.mkdirSync(uploadPath);
  }

  form.uploadDir = uploadPath;

  // When a file has been uploaded successfully, rename it to it's original name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  form.on('end', function() {
    res.end('success');
  });

  form.parse(req);
});

module.exports = router;
