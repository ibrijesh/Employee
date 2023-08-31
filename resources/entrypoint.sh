#!/bin/sh
mongoimport --collection employees --file employeedata.json --jsonArray --uri "mongodb://employee-database:27017/employeedb" &&
npm start