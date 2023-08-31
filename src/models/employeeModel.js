/**  
    datebase - employeedb
    collection - employees 
 **/


const mongoose  = require("mongoose");


/**  
    mongodb://localhost:27017/employeedb -  use this url to connect with mongodb if you are running on local machine 
    mongodb://employee-database:27017/employeedb - use this url to connect with mongodb if you are using docker-compose
**/


mongoose.connect('mongodb://employee-database:27017/employeedb')
        .then(()=>console.log('Successfully connected to EmployeeDB'))
        .catch(err=>console.log('Could not connect to EmployeeDB..',err));



/** Defining  Employee Schema  */


const employeeSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      minlength:1,
      maxlength: 10
    },
    lastName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 10
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    salary: {
      type: Number,
      required: true
    },
    startDate:{
        type:  Date,
        required: true
    }
  });



const Employee = mongoose.model("Employee",employeeSchema);

module.exports=Employee;