const jwt = require('jsonwebtoken');

const verifyJWT = (req,res,next) => {
    const authHeader = req.header['authorization']||req.header['Authorization'];
    if(!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({message: 'Unauthorized'});
    const token = authHeader.split(' ')[1];
    if(!token) return res.status(401).json({message: 'Unauthorized'});
    try{
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.username;
        next();
    }catch(e){
        return res.status(403).json({message: 'Forbidden'});
    }
}

module.exports = verifyJWT;