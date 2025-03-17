import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header("token");
        if(!token)
        {
            return res.status(401).json({success:false, message:'Not authorized! Try again'});
        }
        const token_decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!token_decoded.id)
        {
            return res.status(401).json({success: false, message: 'Not authorized! Try again'})
        }
        req.userId = token_decoded.id;
        next();
    } catch (error) {
        res.status(401).json({success:false,message:error.message});
    }
}

export default authMiddleware;