const  validate = require('../middlewares/fields');
const  validateJWT = require('../middlewares/jwt');

module.exports = {
    ...validate,
    ...validateJWT
}