const {Router} = require('express');
const { check } = require('express-validator');
const {signUp, login} = require('../controllers/auth');

const {validate} = require('../middlewares/index');

const router =  Router();

router.post('/login',
    [ 
      check('email','Email invalido').isEmail(),
      
      check('email','El correo es obligatorio').not().isEmpty(),
      check('password','La contraseña es obligatoria').not().isEmpty(),
     validate
    ],
     login);

router.post('/sign',signUp);

module.exports = router;