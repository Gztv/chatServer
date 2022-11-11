const User = require('../models/user');

const emailExist = async(email = '') => {
    const existEmail = await User.findOne({email})
    if(existEmail){
        throw new Error('Este email ya está registrado');
    }
}

module.exports = {
    emailExist 
}