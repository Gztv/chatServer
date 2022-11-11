const {response} = require('express');

const User = require('../models/user');
const Message = require('../models/msg');


const userConnected = async(uid = '') => {
    const user = await User.findOne({uid});

    user.online = true;

    await user.save();

    return user;
}

const userDisconnected = async(uid = '') => {
    const user = await User.findOne({uid});

    user.online = false;

    await user.save();

    return user;
}

const usersOnline = async(req, res = response) => {
    
    const users = await User.find({uid: {$ne: req.uid}}).sort('-online');

    res.json({
        status: 'OK',
        users
    });
}

const saveMessage = async(payload) =>{
    try {
        const msg = new Message(payload);

        await msg.save();

        return true;

    } catch (error) {
        return false;
    }
};

module.exports = {
 userConnected,
 userDisconnected,
 usersOnline,
 saveMessage
}