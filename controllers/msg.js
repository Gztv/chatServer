const Message = require('../models/msg');

const getMessages = async(req, res) =>{
    const myId = req.uid + '';
    //const myId = req.params.from;
    const msgto = req.params.from;

    const last30msg = await Message.find({
        $or: [{from: myId, to: msgto}, {from: msgto, to: myId} ]
    }).sort({createdAt :'desc'}).limit(30);

    res.json({
        status: 'OK',
        myId,
        msgto,
        msg: last30msg
    });
};

module.exports = {getMessages};