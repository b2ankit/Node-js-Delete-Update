//Require express dependencies
var express = require('express');

//Require module of employee from employee.js file
var empModel = require('../modules/employee');

//creat a object of route
var router = express.Router();

//query for find result from collection
var employee=empModel.find({});




// start routing.... 

router.get('/', function(req, res, next) {

  //execute object employee to fetch data
  employee.exec(function(err,data){
      if(err) throw err;   //throw err if occur
        res.render('index', { title: 'Employee Records',records:data, success:''}); //render data for ejs page
      
  });
  
});

//creating route for insert 

router.post("/",function(req,res,next){

//creat a object of employee model

  var empDetails = new empModel({
    name: req.body.uname,           //take value from ejs view from
    email:req.body.email,
    etype:req.body.emptype,
    hourlyrate:req.body.hrlyrate,
    totalHour:req.body.ttlhr,
    total:parseInt(req.body.hrlyrate)*parseInt(req.body.ttlhr),       //which indicate data in Number Form
  });

  empDetails.save( function(err,res1){              // Use empDetails.save() to store data into database   and also refresh the table by using function(err,res1)    
    if(err)  throw err;                             //if err is occure
    employee.exec(function(err,data){               //
      if(err) throw err;                            //throw err if occur
        res.render('index', { title: 'Employee Records',records:data,success:'Data Inserted successfully'}); //render data for ejs page
      

  });
  // console.log(empDetails);


 
});  

});


//creating route for delete
router.get('/delete/:id', function(req, res, next) {
  var id=req.params.id;
  var del = empModel.findByIdAndDelete(id);

  //execute object employee to fetch data
  del.exec(function(err){
      if(err) throw err;   //throw err if occur
        // res.redirect("/"); //redirect to the base root
        employee.exec(function(err,data){
          if(err) throw err;   //throw err if occur
            res.render('index', { title: 'Employee Records',records:data, success:'Data Deleted Sucessfully'}); //render data for ejs page
          
      });
      
  });
  
});



//creating route for fetch older data
router.get('/edit/:id', function(req, res, next) {

    var id = req.params.id;
    var edit = empModel.findById(id);

  //execute object employee to fetch data
      edit.exec(function(err,data){
      if(err) throw err;   //throw err if occur
        res.render('edit', { title: 'Edit Employee Records',records:data}); //render data for ejs page
      
  });
  
});
//creating route for update
router.post('/update/', function(req, res, next) {

  
  var update = empModel.findByIdAndUpdate(req.body.id,{
    name: req.body.uname,           //take value from ejs view from
    email:req.body.email,
    etype:req.body.emptype,
    hourlyrate:req.body.hrlyrate,
    totalHour:req.body.ttlhr,
    total:parseInt(req.body.hrlyrate)*parseInt(req.body.ttlhr),       //which indicate data in Number Form

  });

//execute object employee to fetch data
    update.exec(function(err,data){
    if(err) throw err;   //throw err if occur
    employee.exec(function(err,data){
      if(err) throw err;   //throw err if occur
        res.render('index', { title: 'Employee Records',records:data, success:'Data Updated Sucessfully'}); //render data for ejs page
      
  });
});

});


//Export route module
module.exports = router;
