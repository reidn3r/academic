
const check = (req, res, next) => {
    if(!req.auth) return res.status(200).redirect('/v1');
    next();
}

module.exports = check;