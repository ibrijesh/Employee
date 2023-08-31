exports.getAllEmployees = async (client) => {
    return await client.find();
}

exports.getEmployeeByEmail = async (client, email) => {
    return await client.findOne({"email":email});
}

exports.addEmployee = async (client, data) => {
    const employee = new client(data);
    return  await employee.save();
}


exports.updateEmployeeData = async (client, email, updatedData) => {

    console.log(updatedData);

    return await client.updateOne(
      { email: email },
      {
        $set: {
          firstName: updatedData.firstName,
          lastName: updatedData.lastName,
          salary: updatedData.salary,
        }
      }
    ); 
}



exports.deleteEmployee = async (client, email) => {
    return  await client.deleteOne({"email":email});
}

