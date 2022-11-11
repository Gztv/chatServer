const {Router} = require('express');

const {validate, validateJWT} = require('../middlewares/index');
const {usersOnline} = require('../controllers/online');
const router =  Router();

router.get('/',[validateJWT,validate],usersOnline);

module.exports = router;