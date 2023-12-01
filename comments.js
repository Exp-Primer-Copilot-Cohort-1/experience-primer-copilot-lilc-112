//Create web server
Suggestion 1

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var mongoose = require('mongoose');
var Comment = require('../models/Comment.js');
var Post = require('../models/Post.js');
var User = require('../models/User.js');

//Create web server
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Connect to database
mongoose.connect('mongodb://localhost:27017/meanblog');

//Get all comments
router.get('/', function(req, res, next) {
  Comment.find(function (err, comments) {
    if (err) return next(err);
    res.json(comments);
  });
});

//Get comments by commentId
router.get('/:id', function(req, res, next) {
  Comment.findById(req.params.id, function (err, comment) {
    if (err) return next(err);
    res.json(comment);
  });
});

//Get comments by postId
router.get('/post/:id', function(req, res, next) {
  Comment.find({postId: req.params.id}, function (err, comments) {
    if (err) return next(err);
    res.json(comments);
  });
});

//Get comments by userId
router.get('/user/:id', function(req, res, next) {
  Comment.find({userId: req.params.id}, function (err, comments) {
    if (err) return next(err);
    res.json(comments);
  });
});

//Get comments by username
router.get('/username/:username', function(req, res, next) {
  User.findOne({username: req.params.username}, function (err, user) {
    if (err) return next(err);
    Comment.find({userId: user._id}, function (err, comments) {
      if (err) return next(err);
      res.json(comments);
    });
  });
});

//Add new comment
router.post('/', function(req, res, next) {
  Comment.create(req.body, function (err, comment) {
    if (err) return next(err);
    res.json(comment);
  });
});

//Update comment
router.put('/:id', function(req, res, next) {
  Comment.findByIdAndUpdate(req.params.id, req.body, function (err, comment) {
    if (err) return next(err);
    res.json(comment);
  });
});

//Delete comment
router