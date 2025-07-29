import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const bearerHeader = req.headers?.authorization;
        const tokenFromHeader = bearerHeader?.startsWith("Bearer ")
            ? bearerHeader.split(" ")[1]
            : null;

        const token = req.cookies?.accessToken || tokenFromHeader;

        if (!token) {
            return res.status(401).json({
                message: "provide token",
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

        if (!decode) {
            return res.status(401).json({
                message: "unauthorized access",
                error: true,
                success: false,
            });
        }

        req.userId = decode.id;
        next();
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal server error",
            error: true,
            success: false,
        });
    }
};

export default auth;
