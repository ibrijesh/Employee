
exports.validateEmail = async (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };


exports.validateName = async(name) => {
  for (let i = 0; i < name.length; i++)
    if(!(name[i]>='a' && name[i]<='z'))
      return false;
    return true;  
};