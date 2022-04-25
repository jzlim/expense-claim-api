import jwtHelper from "@app/core/jwtHelper";
import responseStatus from "@app/core/responseStatus";
import { NextFunction, Request, Response } from "express";

const authUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.get("x-auth-token");
    if (!token) {
        res.status(responseStatus.UNAUTHORIZED).json({ message: 'Access denied' });
    } else {
        try {
            const payload = jwtHelper.verifyAccessToken(token);
            if (!payload) {
                res.status(responseStatus.FORBIDDEN).json({ message: 'Access denied' });
            }
            next();
        } catch (error) {
            res.status(responseStatus.UNAUTHORIZED).json({ message: 'Access denied' });
        }
    }
}

export default authUser;