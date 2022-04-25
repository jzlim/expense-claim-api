import { accessTokenSecret, JWT_ALGO, JWT_EXPIRED_IN, refreshTokenSecret } from "@app/config";
import User from "@app/database/model/User";
import { sign, verify } from "jsonwebtoken";

const generateAccessToken = (user: User): string => {
    const tokenSecret = accessTokenSecret;
    const payload = { _id: user._id, username: user.username };
    const token = sign(payload, tokenSecret, { algorithm: JWT_ALGO, expiresIn: JWT_EXPIRED_IN });
    return token;
}

const verifyAccessToken = (token: string) => {
    try {
        const decoded = verify(token, accessTokenSecret, { algorithms: [JWT_ALGO] });
        const user = decoded as User;
        return { _id: user._id, username: user.username } as User;
    } catch (error: any) {
        throw new Error(error);
    }
}

const verifyRefreshToken = (token: string) => {
    try {
        const decoded = verify(token, refreshTokenSecret, { algorithms: [JWT_ALGO] });
        const user = decoded as User;
        return { _id: user._id, username: user.username } as User;
    } catch (error: any) {
        throw new Error(error);
    }
}

const generateRefreshToken = (user: User): string => {
    const tokenSecret = refreshTokenSecret;
    const payload = { _id: user._id, username: user.username };
    const token = sign(payload, tokenSecret, { algorithm: JWT_ALGO });
    return token;
}

const jwtHelper = {
    generateAccessToken,
    verifyAccessToken,
    verifyRefreshToken,
    generateRefreshToken
};

export default jwtHelper;