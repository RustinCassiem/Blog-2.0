var express = require('express');
var router = express.Router();
var posts = require('../db.json');
var request = require('request');
var store = require('../db.json');
var arrayData = store.users;
var pos = store.posts;
 

// var app = express();
// var reload = require('../../reload');

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(posts);

  res.render('index', {
    title: "Home",
    posts: posts.posts
  });
});

/* GET create page. */
router.get('/create', function (req, res, next) {
  // console.log(posts);

  res.render('create', {
    title: "create"
  });
  console.log(req.body);

});


/* POST to create page. */
router.post('/create', function (req, res, next) {

  // res.send(req.body);
  let obj = {
    "title": req.body.title,
    "author": req.body.author,
    "dateTime": req.body.dateTime,
    "content": req.body.content,
    "img": req.body.img
  };


  request.post({

    url: "http://localhost:8000/posts",
    body: obj,
    json: true

  }, function (error, response, body) {

    res.redirect("/");

  });

});


// // Route for view page
router.get('/:id', function(req, res, next) {
    //make a post request to our database
    request({
    uri: "http://localhost:8000/posts/" + req.params.id,
    method: "GET",
    }, function(error, response, body) {
        console.log(JSON.parse(body));
        //send a response message
        res.render('view', {posts: JSON.parse(body)});
    });
})




// UPDATE ROUTES
router.get('/update/:id', function(req, res, next) {

  //make a post request to our database
  request({
  uri: "http://localhost:8000/posts/" + req.params.id,
  method: "GET",
  }, function(error, response, body) {
      console.log(JSON.parse(body));
      //send a response message
      res.render('update', {message: false, posts: JSON.parse(body)});
  });

});

router.post('/update', function(req, res, next) {
  console.log(req.params.content)
  request({
    uri: "http://localhost:8000/posts/" + req.params.id,
  method: "POST",

  form: {
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
      dateTime:  req.body.dateTime
  }
  }, function(error, response, body) {
      // console.log(body);
      //send a response message
      res.render('update', {message: 'Successfully Changed.', posts: JSON.parse(body)});
  });
})


/* GET Register Page  */
router.get('/reg', function (req, res, next) {
  // console.log(posts);
  
router.get('/reg', function (req, res, next) {
  if (req.cookies.user) {
    for (var m in arrayData) {
      if (arrayData[m].user == req.cookies.user) {
        
        res.render('index', {name:req.cookies.user, data: pos, messages: false});
  
      }
    }
  } else {
    res.render('index', {name: false, data: posts, messages: false});
  }

});

  res.render('reg', {
    title: "Register Page"
  });
  console.log(req.body);

});


// Route for new blog created interlude
router.get('/new', function (req, res, next) {
  console.log(post);

  res.render('', {
    title: "new"
  });
});

// UPDATE ROUTES
router.get('/update/:id', function(req, res, next) {

  //make a post request to our database
  request({
  uri: "http://localhost:8000/posts/" + req.params.id,
  method: "GET",
  }, function(error, response, body) {
      console.log(JSON.parse(body));
      //send a response message
      res.render('update', {message: false, posts: JSON.parse(body)});
  });

});

router.post('/update/:id', function(req, res, next) {
  request({
    uri: "http://localhost:8000/posts/" + req.params.id,
  method: "PATCH",
  form: {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
  }
  }, function(error, response, body) {
      // console.log(body);
      //send a response message
      res.render('update', {message: 'Successfully Changed.', posts: JSON.parse(body)});
      alert(`go home`)
  });
});

// Route for delete 
/* GET create page. */
router.get('/delete/:id', function(req, res, next) {
  console.log(req.params.id)
//make a post request to our database
request({
  uri: "http://localhost:8000/posts/"  + req.params.id,
  method: "DELETE",
  }, function(error, response, body) {
      // console.log(body);
      //send a response message

      let data = {
          message: 'Successfully Removed.',
      }

      res.redirect('..');
  });
});

































newFunction();

function newFunction() {
  module.exports = router;
}
