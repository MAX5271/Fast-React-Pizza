const jwt = require('../utils/jwtHelper');
const userRepository = require('../repository/userRepository');

const login = async (email, password) => {
    const user = await userRepository.getUserByEmail(email);
    if(!user) throw new Error('User not found');
    const isMatch = await user.comparePassword(password);
    if(!isMatch) throw new Error('Invalid credentials');
    const accessToken = jwt.generateAccessToken(user.username);
    const refreshToken = jwt.generateRefreshToken(user.username);
    user.refreshToken = refreshToken;
    await user.save();
    return {accessToken, refreshToken};
}

const refreshAccessToken = async (refreshToken) => {
    if(!refreshToken) throw new Error('No token provided');
    const decoded = jwt.verifyRefreshToken(refreshToken);
    const user = await userRepository.getUserByUsername(decoded.username);
    if(!user || user.refreshToken !== refreshToken) throw new Error('Invalid token');
    const accessToken = jwt.generateAccessToken(user.username);
    return accessToken;
}

const logout = async (refreshToken) => {
    if(!refreshToken) throw new Error('No token provided');
    const decoded = jwt.verifyRefreshToken(refreshToken);
    const user = await userRepository.getUserByUsername(decoded.username);
    if(user){
        user.refreshToken = null;
        await user.save();
    }
}

module.exports = {
    login,
    refreshAccessToken,
    logout
}