const { userConnected, userDisconnected, saveMessage } = require('../controllers/online');
const { io } = require('../index');
const { comprobJWT } = require('../middlewares');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    
    const [isAuth, user] = comprobJWT(client.handshake.headers['authorization']);

    if(!isAuth){return client.disconnect();} 
    console.log(isAuth,user);

    userConnected(user['uid']);

    client.join(user['uid']);

    client.on('private-msg',async(payload)=>{
        
        await saveMessage(payload);

        io.to(payload.to).emit('private-msg');
    });

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        userDisconnected(user['uid']);
    });

});
