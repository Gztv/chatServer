const {Router} = require('express');

const {validate, validateJWT} = require('../middlewares/index');
const {getMessages} = require('../controllers/msg');
const router =  Router();

router.get('/:from',[validateJWT,validate],getMessages);

module.exports = router;