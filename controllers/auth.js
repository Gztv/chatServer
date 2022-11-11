const {Request, Response} = require('express');

const User = require('../models/user');

const {createJWT} = require('../helpers/jwt');

const bcryptjs = require('bcryptjs');

const signUp = async(req = Request, res = Response) => {

    const {body} = req;
    const {email} = body;

    try{
    const existEmail = await User.findOne({email});
    if(existEmail){
        return res.status(400).json({
            status: 'DENIED'
        });
    }
    const user = new User(body);

    const salt = bcryptjs.genSaltSync();
    const encryptpass = await bcryptjs.hash(body.password,salt);

    user.set("password", encryptpass);

    await user.save();

    res.json({ status: 'OK', user });

    }catch(err){
        console.error(err);
        res.status(500).json(
            {status: 'Contact with Administrator, something is wrong'}
        );
    }
}

const login = async(req, res = response) =>{
    const {email,password} = req.body;
    
        try{
    
            const user = await User.findOne({email});
    
            if(!user){
                return res.status(400).json({status:"Email or password are incorrect"});
            }
            /*if(usuario.verify === false){
                return res.status(400).json({status:"Usuario no verificado"});
            }*/
    
            const mathcPassword = bcryptjs.compareSync(password,user.password);
    
            if(!mathcPassword){
                return res.status(400).json({status:"Email o password don't match"});
            }
    
            const token = await createJWT(user.id);
    
            res.json({
                status: 'OK',
                user,
                token
            });
    
        }catch(error){
            console.log(error);
            return res.status(500).json({
                status : 'Contact with Administrator, something is wrong'
            });
        }
    
    }
    
    module.exports = {
        signUp,
        login
    }