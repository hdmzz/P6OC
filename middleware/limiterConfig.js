const rateLimit = require("express-rate-limit");

exports.limiterConfig = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 50 // limit each IP to 100 requests per windowMs
    });

