import jwt from "jsonwebtoken";

const optionalAuth = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1];

        if (token) {
            const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
            if (decode) {
                req.userId = decode.id;
            }
        }
        next(); 
    } catch (error) {
        req.userId = null;
        next();
    }
};

export default optionalAuth;
