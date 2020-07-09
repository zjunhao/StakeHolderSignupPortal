const User = require('../models/user');
const jwtHelper = require('./jwtHelper');

// Middleware for routes which need admin privilege
// NOTICE: Calling on this middleware would require jwt to be provided with the request
module.exports.verifyUserAdminPrivilege = (req, res, next) => {
    // jwtHelper.js would attach _id to req, if that is not called before this isUserAdmin, we manually try to extract user id from token
    const userId = req._id ? req._id : jwtHelper.extractUserIdFromJwtToken(req);

    User.findById(userId, (err, user) => {
        if (err) {
            return res.status(403).json({success: false, message: 'Fail to extract user information using the id provided in jwt token.'});
        } else if (!user) {
            return res.status(403).json({success: false, message: 'Fail to extract user information using the id provided in jwt token.'});
        } else if (!user.privilege) {
            return res.status(500).json({success: false, message: 'Privilege not exist for current user.'});
        } else if (user.privilege.localeCompare('administrator') !== 0) {
            return res.status(403).json({success: false, message: 'The request fails becuase the user is not administrator but try to call api that needs administrator privilege.'});
        } else {
            next();
        }

    })
}