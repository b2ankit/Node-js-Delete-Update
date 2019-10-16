// create a module of employee show that we can fetch data from mongodb database


// require mongoose dependecies
var mongoose = require('mongoose');         

//connect mongoose data base using connect('url',{useNewUrlParser}) method
mongoose.connect('mongodb://localhost:27017/employee', {useNewUrlParser: true});  

//creating a object of connection
var conn = mongoose.connection;


//craeting Employee Schema

var employeeSchema = new mongoose.Schema({
    name:String,
    email:String,
    etype:String,
    hourlyrate:Number,
    totalHour:Number,
    total:Number,
})

//creat a model of employeeSchema so, we can export the model
var employeeModel = mongoose.model('employees',employeeSchema);

//export model of employee
module.exports=employeeModel;


