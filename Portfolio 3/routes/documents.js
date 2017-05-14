const express = require('express');
const path = require('path');
const fs = require('fs');
const middleware = require('../middleware');

const router = express.Router();

router.get('/', middleware.isSignedIn, function(req, res) {
  // Get path for user's uploads
  const userFolderPath = path.join(__dirname, '../uploads', req.user.username);
  let filenames = [];
  let files = [];

  // Check if users uploads directory exists before reading it
  if (fs.existsSync(userFolderPath)){
    filenames = fs.readdirSync(userFolderPath);
    filenames.forEach(function(filename) {
      let stats = fs.statSync(path.join(userFolderPath, filename));
      stats.filename = filename;
      files.push(stats);
    });
  }

  res.render('documents', { files: files });
});

router.get('/:filename', middleware.isSignedIn, function(req, res) {
  res.sendFile(path.join(__dirname, '../uploads', req.user.username, req.params.filename));
});

router.delete('/:filename', middleware.isSignedIn, function(req, res) {
  // Get path for file to be deleted
  const filepath = path.join(__dirname, '../uploads', req.user.username, req.params.filename);
  // Delete the file
  fs.unlinkSync(filepath);
  // Reload the documents
  res.redirect("/documents");
});

module.exports = router;
