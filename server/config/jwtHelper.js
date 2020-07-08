const jwt = require('jsonwebtoken');

// if succeed, this middleware will add _id extracted from jwt into req._id
module.exports.verifyJwtToken = (req, res, next) => {
    var token;
    // header: {authorization: Bearer jwt-token-here}
    if ('authorization' in req.headers) {
        token = req.headers['authorization'].split(' ')[1];
    }

    if (!token) {
        return res.status(403).json({success: false, message: 'No token provided.'})
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(500).send({success: false, message: 'Invalid token'});
            } else {
                req._id = decoded._id;
                next();
            }
        })
    }
    
}