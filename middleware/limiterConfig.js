const rateLimit = require("express-rate-limit");

exports.limiterConfig = rateLimit({
        windowMs: 3 * 60 * 1000, // 3 minutes
        max: 50// limit each IP to 2 requests per windowMs
    });

