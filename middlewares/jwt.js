const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = async(req, res = response,next) => {
    const bearerToken = req.header('Authorization');

    if(!bearerToken){
        return res.status(401).json({msg: 'No hay token en petición'});
    }

    const token = bearerToken.replace("Bearer ","");
    try{
        const {uid} = jwt.verify(token,process.env.PRIVATEKEY);
        req.uid = uid;
        
        next();

    }catch(error){
        return res.status(401).json({msg: 'Token invalido'});
    }
    
}

const comprobJWT = (token = '') =>{
    try{
        const uid = jwt.verify(token, process.env.PRIVATEKEY);
        return [true,uid]
    }catch(error){
        return [false,null]
    }
}
module.exports = {
    validateJWT,
    comprobJWT
}