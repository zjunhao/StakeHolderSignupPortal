const jwt = require('jsonwebtoken');

// --------------------- Middleware functions ------------------------------

// Verify if jwt token is valid.
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


// -------------------- Helper functions ------------------------------------

// Extract user id from jwt token provided with request.
// Return user id if succeeds, return null if fails.
module.exports.extractUserIdFromJwtToken = (req) => {
    var token;
    // header: {authorization: Bearer jwt-token-here}
    if ('authorization' in req.headers) {
        token = req.headers['authorization'].split(' ')[1];
    }

    if (!token) {
        return null;
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return null;
            } else {
                return decoded._id;
            }
        })
    }
}