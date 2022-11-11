require('dotenv').config();
const express = require('express');
const cors = require('cors');
// App de Express
const app = express();
const path = require('path');

const { dbConnection } = require('./db/config');
dbConnection();

// Node Server
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);
require('./sockets/socket');

// Path público
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );

app.use(cors());
app.use(express.json());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/online',require('./routes/users'));
app.use('/api/messages',require('./routes/msg'));



server.listen( process.env.PORT, ( err ) => {

    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT );

});


