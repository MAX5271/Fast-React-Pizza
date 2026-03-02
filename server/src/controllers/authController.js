const authService = require('../services/authService');

const login = async (req,res) => {
    const {email,password} = req.body;
    try{
        const tokens = await authService.login(email,password);
        res.cookie('refreshToken', tokens.refreshToken, {httpOnly: true, secure: true, sameSite: 'none', maxAge: 7*24*60*60*1000});
        res.status(200).json(tokens);
    }catch(e){
        res.status(400).json({message: e.message});
    }
}

const refreshAccessToken = async (req,res) => {
    if(!refreshToken) return res.status(401).json({message: 'Unauthorized'});
    const {refreshToken} = req.cookies;
    try{
        const accessToken = await authService.refreshAccessToken(refreshToken);
        res.status(200).json({accessToken});
    }catch(e){
        res.status(400).json({message: e.message});
    }
}

const logout = async (req,res) => {
    if(!req.cookies.refreshToken) return res.status(401).json({message: 'Unauthorized'});
    const {refreshToken} = req.cookies
    try{
        await authService.logout(refreshToken);
        res.clearCookie('refreshToken', {httpOnly: true, secure: true, sameSite: 'none'});
        res.status(200).json({message: 'Logged out successfully'});
    }catch(e){
        res.status(400).json({message: e.message});
    }
}

module.exports = {
    login,
    refreshAccessToken,
    logout
}