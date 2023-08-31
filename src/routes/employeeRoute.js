const express = require('express');
const controller = require('../controllers/employeeController');
const router = express.Router();




/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - salary
 *         - startDate    
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         firstName:
 *           type: string
 *           description: Employee first name
 *         lastName:
 *           type: string
 *           description: Employee last name
 *         email:
 *           type: string 
 *           unique: true
 *           description: Employee  email id   
 *         salary:
 *           type: number
 *           description: Employee salary
 *         startDate:
 *           type: string
 *           description: Employee joinning date (YY-MM-DD)                   
 *         
 */


/**
  * @swagger
  * tags:
  *   name: Employees
  *   description: The employee managing API
  */




/**
 * @swagger
 * /api/v1/employees:
 *   get:
 *     summary: Returns the list of all the employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: The list of the employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */


router.get("/",controller.getAllEmployees);


/**
 * @swagger
 * /api/v1/employees/{email}:
 *   get:
 *     summary: Get the employee by email id.
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The email id
 *     responses:
 *       200:
 *         description: The employee description by email
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: The employee was not found
 */


router.get("/:email",controller.getEmployeeByEmail);



/**
 * @swagger
 * /api/v1/employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: The employee was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Bad request  
 *       500:
 *        description: Some error happened  
 */

/* POST http://localhost:3000/api/v1/employee */

router.post("/",controller.addEmployee);




/**
 * @swagger
 * /api/v1/employees/{email}:
 *  put:
 *    summary: Update the employee by the email id
 *    tags: [Employees]
 *    parameters:
 *      - in: path
 *        name: email
 *        schema:
 *          type: string
 *        required: true
 *        description: The employee email id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Employee'
 *    responses:
 *      200:
 *        description: The employee was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Employee'
 *      404:
 *        description: The employee was not found
 *      500:
 *        description: Some error happened
 */


router.put("/:email",controller.updateEmployeeData);




/**
 * @swagger
 * /api/v1/employees/{email}:
 *   delete:
 *     summary: Remove the employee by email id
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The employee email id
 * 
 *     responses:
 *       200:
 *         description: The employee was deleted
 *       404:
 *         description: The employee was not found
 */


router.delete("/:email",controller.deleteEmployee);




module.exports=router;