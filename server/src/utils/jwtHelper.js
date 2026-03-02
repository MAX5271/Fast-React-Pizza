const jwt = require('jsonwebtoken');

const generateAccessToken = (username)=>{
    const accessToken = jwt.sign({username:username},process.env.ACCESS_TOKEN_SECRET,{expiresIn: '30m'});
    return accessToken;
}

const generateRefreshToken = (username) => {
    const refreshToken = jwt.sign({username:username},process.env.REFRESH_TOKEN_SECRET);
    return refreshToken;
}

const verifyRefreshToken = (token) => {
    const result = jwt.verify(token,process.env.REFRESH_TOKEN_SECRET);
    return result;
}

exports.module = {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
}