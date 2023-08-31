const Employee = require('../models/employeeModel')
const employeeService = require('../services/employeeService');
const validator = require('../Utils/validator');
const moment = require("moment");


exports.getAllEmployees = async (req,res) =>{

    try{
        const employees = await employeeService.getAllEmployees(Employee); 
        return res.status(200).send(employees);
    }
    catch(error){
        return res.status(400).send(error);
    }

};



exports.getEmployeeByEmail = async(req, res) => {

    const email = req.params.email
    console.log(email);

    try{

        const employee = await employeeService.getEmployeeByEmail(Employee,email);
        
        if(employee===null)
            throw new Error(`employee with email id ${email} does not exist`);  

        return res.status(200).json(employee);
    }
    catch(err){
        console.log("Error",err.message); 
        return res.status(400).json({"message":err.message});
    }

};



exports.addEmployee = async (req, res) =>{

    console.log(req.body);

    const email = req.body.email
    req.body.firstName=req.body.firstName.toLowerCase();
    req.body.lastName=req.body.lastName.toLowerCase();

    if(!await validator.validateEmail(email))
        return res.status(400).json({"message": "Invalid Email"});

    if(!await validator.validateName(req.body.firstName))
        return res.status(400).json({"message": "First Name contains non-alphabatical character"});

    if(!await validator.validateName(req.body.lastName))
        return res.status(400).json({"message": "Last Name contains non-alphabatical character"});  
  
  
    req.body.startDate=moment.utc(req.body.startDate);  
        
    if(req.body.startDate>moment.utc())
        return res.status(400).json({"message": "start date is ahead of current date"});  
      

    try{

        const alreadyPresent = await employeeService.getEmployeeByEmail(Employee,email);

        if(!(alreadyPresent===null))
            return res.status(400).json(`employee record with email id ${email} already exist`);  

        let ret = await employeeService.addEmployee(Employee,req.body);
        return res.status(200).send(ret);
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({"message":err.message});
    }
}



exports.updateEmployeeData = async (req, res) =>{

    const email = req.params.email
    console.log(email);

    try{

        const oldData = await employeeService.getEmployeeByEmail(Employee,email);
        if(oldData===null)
            return res.status(400).json(`employee record with email id ${email} does not exists`);   
            
        
        const updatedData = {
                "firstName" : (req.body.firstName===undefined)?oldData.firstName:req.body.firstName,
                "lastName" : (req.body.lastName===undefined)?oldData.lastName:req.body.lastName,
                "salary" : (req.body.salary===undefined)?oldData.salary:req.body.salary
        }     

        console.log(updatedData);

        const result= await employeeService.updateEmployeeData(Employee, email, updatedData);
        if(result.modifiedCount>0)
            return res.status(200).json({"message":"Employee details successfully updated"});

        return res.status(400).json({"message":"Could not able to update employee details"});    
    }
    catch(err){
        console.log("Error",err.message); 
        return res.status(500).json({"message":err.message});
    }

}



exports.deleteEmployee = async (req, res) => {
    const email = req.params.email
    console.log(email);

    try{

        const ret = await employeeService.getEmployeeByEmail(Employee,email);
        if(ret===null)
            throw new Error(`employee record with email id ${email} does not exists`);     
        await Employee.deleteOne({"email":email});

        return res.status(200).json({"message" : `employee with email id ${email} deleted successfully`})
        
    }
    catch(err){
        console.log(err.message); 
        return res.status(400).json({"message":err.message});
    }
}