var express = require('express');
var router = express.Router();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var redis = require("redis");

var client  =  redis.createClient();
var redisStore = require('connect-redis')(session);

var sess;

//var app = express();
router.use(session({secret: 'ssshhhhh' , 
  store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  260}),
  saveUninitialized: true,resave: true}));
router.use(cookieParser());
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});
/* GET Hello World page. */
router.get('/login', function(req, res) {
   if(req.session.email){
        //res.write('<h1>Hello '+req.session.email+'</h1>');
       // res.end('<a href='+'/logout'+'>Logout</a>');
        res.render('imgupload',{title:req.session.email});
      }else{
        res.render('login' );    
      }
    
   
});
    router.get('/deleteme', function(req, res) {
    res.render('deleteme' );
});

    router.get('/update', function(req, res) {
    res.render('update' );

});
     router.get('/view', function(req, res) {
    res.render('view' );

});

router.get('/reg', function(req, res) {
    res.render('reg' );
});
router.get('/success', function(req, res) {
    res.render('success' );
});
router.get('/failure', function(req, res) {
    res.render('failure' );
});

router.get('/home', function(req, res) {
 // console.log(req.session);
    res.render('home' );
});

router.get('/imgupload', function(req, res) {
 // console.log(req.session);
    res.render('imgupload');
});
/* GET contact page. */

// router.get('/userlist', function(req, res) {
//     var db = req.db;
//     var collection = db.get('usercollection');
//     collection.find({},{},function(e,docs){
//         res.render('userlist', {
//             "userlist" : docs
//         });
//     });
// });
/* GET New User page. */
// router.get('/newuser', function(req, res) {
//     res.render('newuser', { title: 'Add New User' });
// });

//storing user details

router.post('/signup', function(req, res) {

     // Set our internal DB variable
    //  var Firstname = req.param('fname');
    // var Lastname = req.param('lname');
    // var Emailid=req.param('email');
    // var password=req.param('pass');
    // var phoneno=req.param('phone');

     var db = req.db;
     var collection = db.get('user');

     collection.find({
     email :req.body.email,
     }, function (err, doc) 
     {
       if (err) 
       {
             // If it failed, return error
         res.send("There was a problem adding the information to the database.");
       }
       else
       {
         if(doc.length<=0)
         {
              // Submit to the DB
           collection.insert({
           firstname    : req.body.fname,
           lastname    : req.body.lname,
           email  :req.body.email,
           passwd :req.body.pass,
           phono :req.body.phone,
           region:req.body.region,
         }, function (err, doc) 
         {
           if (err) 
           {
             // If it failed, return error
             res.send("There was a problem adding the information to the database.");
           }
           else 
           {
             // And forward to success page
             //res.redirect("home");
             res.json({message:'success'});
           } });
         }
         else
         {
           res.send("Email Id already exist! Please login to continue");
         }
       }
 }); });
//login credential checking
router.post('/login', function(req, res) {
   var db = req.db;

   var collection = db.get('user');
   collection.find({
     email  :req.body.text1,
     passwd  :req.body.text2
   }, function (err, doc) {
       if (err) {
         console.log("I am in if");
           // If it failed, return error
           res.send("There was a problem adding the information to the database.");
       }
       else {
         //console.log("Return Value : ",returnValue);
         if(doc.length>0)
         {
          //sess=req.session;
          req.session.email=req.body.text1;
          req.session.userdetails=doc;
         // console.log(req.session.key);
          res.render('imgupload',{title:req.session.email});
           //res.write('<h1>Hello '+req.session.email+'</h1>');
         // res.end('<a href='+'/logout'+'>Logout</a>');
           //res.send("success");
           // res.redirect('/home');
         }
         else
         {
           res.send("failure");
         }
       }
   });
 
});

router.get('/logout',function(req,res){

req.session.destroy(function(err){
if(err){
console.log(err);
}
else
{
  //console.log(sess.email);
res.redirect('/login');
}
});
});


router.post('/emailcheck', function(req, res) {
   
     var db = req.db;

     var collection = db.get('user');
     var mail=req.get('data');


     console.log("Email Id = ", +	req.get('data'));

     // Submit to the DB
     collection.find({
     email  : req.get('data')
     }, function (err, doc) 
     {
         if (err) {
           console.log("I am in error");
             // If it failed, return error
             res.send("There was a problem adding the information to the database.");
         }
         else {
           console.log("Doc length : ",doc.length);
           //console.log("Value : ",req.param(a));
           if(doc.length<=0)
           {
             res.send("");
           }
           else
           {
             res.send("Email Id already exist!");
           }
         }
     });
 });

//deletion
router.post('/del', function(req, res) 
{
   
     var db = req.db;
     var collection = db.get('user');
     var id=req.body.myid;
     collection.find({email:id}, function (err, doc) 
     {
         if (err) 
         {
           console.log("I am in error");
             // If it failed, return error
             res.send("There was a problem adding the information to the database.");
         }
         else 
         {
          // console.log("Doc length : ",doc.length);
           //console.log("Value : ",req.param(a));
           if(doc.length<=0)
           {
             res.send("user not registered");
           }
           else
           {
             collection.remove({email:id }, function (err, doc) 
              {
             	//console.log("doc len:",doc.length);
               if (err) 
               {
                  console.log("I am in error");
             // If it failed, return error
                 res.send("There was a problem adding the information to the database.");
               }
              else 
              {
           	//res.send("deleted");
           //console.log("Doc length : ",doc.length);
           //console.log("Value : ",req.param(a));
                 if(doc.length!=0)
                 {
                  res.send("deleted");
                 }
                 else
                 {
                   res.send("not");
                 }
              }

           });
         }}
     });
});

//update function
router.post('/update1', function(req, res) 
{
   
     var db = req.db;

     var collection = db.get('user');
     //var mail=req.get('data');


     //console.log("Email Id = ", +	req.get('data'));

     var id=req.body.myid1;
     var ph=req.body.ph;
     
     collection.find({email:id}, function (err, doc) 
     {
        console.log(doc);
         if (err) 
         {
           console.log("I am in error1");
             // If it failed, return error
             res.send("There was a problem adding the information to the database......");
         }
         else 
         {
          // console.log("Doc length : ",doc.length);
           //console.log("Value : ",req.param(a));
           if(doc.length<=0)
           {
             res.send("user not registered");
           }
           else
           {
            console.log(ph);

             collection.update({email:id}, {$set:{phono:ph}}, function (err, doc) 
              {
             	//console.log("doc len:",doc.length);
               if (err) 
               {
                  console.log("I am in error2");
             // If it failed, return error
                 res.send("There was a problem adding the information to the database.");
               }
              else 
              {
          
                 if(doc.length!=0)
                 {
                  res.send("updated");
                 }
                 else
                 {
                   res.send("not");
                 }
              }

           });
         }
       }
     });
});

//view
router.get('/view1', function(req, res) {
 console.log("1");

   // Set our internal DB variable
   var db = req.db;

   var collection = db.get('user');

   // Submit to the DB
   collection.find({},function (err, doc) {
       if (err) {
         console.log("I am in if");
           // If it failed, return error
           res.send("There was a problem adding the information to the database.");
       }
       else {
       	var data=doc;
         console.log("Return Value : ",data);
       // console.log(doc.value);
       //JSON.stringify(data, null, '\t');
        res.send(data);
       }
   });
});

router.post('/upload',function(req,res){
   var db = req.db;
   var collection = db.get('myimage');
   var base64Data = req.body.image.replace(/^data:image\/png;base64,/,"");
   var dataBuffer = new Buffer(base64Data, 'base64');

  // console.log(req.body.image);
   collection.insert({image:dataBuffer.toString()},function(err,doc){
    if(err){
     // console.log(err.status);
      res.send("error while sending image");
    }
    else{

      res.send("sucuess");
    }
   });
});
module.exports = router;

// var base64Data = imagefile.replace(/^data:image\/png;base64,/,""),
// var dataBuffer = new Buffer(base64Data, 'base64');

// below line won't actually work but it's something along the lines of what you want:

//db.foo.insert({magic: 123, etc... img: dataBuffer.toString()})

// collection.find({},function(err,doc){
//       if(err)
//       res.send("error retriving image");
//       else{
//         console.log(doc);
//         // var bitmap=new Buffer(image,'base64');
//         // res.send(bitmap);
//        }
//     });



