const con = require('../functions/sql')

const configure = (req, res, next) => {
    res.locals.user = req.user;
    next();
}

module.exports = configure