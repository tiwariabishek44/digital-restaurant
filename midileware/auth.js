const jwt = require("jsonwebtoken")
const Secretekey = '6D5A713374367739';
const auth = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if (!token)
            return res.status(401).json({ msg: "no auth token, access denied" });
        const verified = jwt.verify(token, Secretekey);
        if (!verified)
            return res.status(401).json({ msg: "token verification failed , authorization denied" })
        
        req.user = verified.id;
        next();
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};


module.exports = auth;
