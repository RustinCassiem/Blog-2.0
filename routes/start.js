var express = require('express');
var router = express.Router();
var data = require('../db.json');
var request = require("request");

// save users into variable
var userData = data.users;


/* GET sign in page. */
router.get('/', function(req, res, next) {
    res.clearCookie('user');
    res.render('sign', {messages: false, name:""});
});

router.post('/login', function(req, res, next) {

    //Cycle through users
    userData.forEach((userData) => {

        //check whether an Account exists and if password is correct
        // console.log(req.body);
        
        if(userData.user == req.body.username && userData.password == req.body.password) {
            //create cookie
            res.cookie('user', userData.user);
            
            // renders homepage
            // res.render('/index', {data: userData.posts, user: userData.user});
            res.redirect("/")
        }
        

    })

});



//gets the registration page
router.get('/reg', function(req, res, next) {
    res.render('reg', {messages: false, name: false});
});

// handles post request to "/"
router.post('/regUser', function(req, res, next){

    userData.forEach((userData) => {
        //check if username has already been taken
        if (userData.user == req.body.username) {
            res.render('reg', {messages: "Username unavailable.", name: false});
        }
    })


    if (req.body.password != req.body.conPass) {
        res.render('reg', {messages: "Passwords do not match."});
    } else {
        var i = userData.length + 1;
        //create new default user
        request({
            url: "http://localhost:8080/users",
            method: "POST",
            form:{
                id: i,
                user: req.body.username,
                password: req.body.password
            }
        })
        res.render('sign', {messages: 'Successfully Registered.'});
    }

});

// for logining out
router.get('/exit', function(req, res, next) {
    res.clearCookie('user');
    res.render('sign', {messages: "Successfully logged out.", name:false});
});


module.exports = router;