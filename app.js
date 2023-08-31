const express=require('express');
const employee=require('./src/routes/employeeRoute');
const cors = require("cors");  
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const app=express();


const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Employee API",
			version: "1.0.0",
			description: "A simple employee  management API",
		},
		servers: [
			{
				url: "http://localhost:5000",
			},
		],
	},
	apis: ["./src/routes/*.js"],
};


const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));


app.use(cors());
app.use(express.json());
app.use('/api/v1/employees',employee);



const port = process.env.port ||  5000
const server = app.listen(port,()=>{
    console.log(`Application Running on ${port}`)
})