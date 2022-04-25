import { Request, Response } from 'express';
import responseStatus from '@app/core/responseStatus';
import User from '@app/database/model/User';
import userRepo from '@app/database/repository/userRepo';
import util from '@app/core/util';
import jwtHelper from '@app/core/jwtHelper';
import userTokenRepo from '@app/database/repository/userTokenRepo';
import UserToken from '@app/database/model/UserToken';

const createUser = async (req: Request, res: Response) => {
    const isUsernameTaken = await userRepo.verifyIsUsernameTaken(req.body.username);
    const isEmailTaken = await userRepo.verifyIsEmailTaken(req.body.email);
    if (isUsernameTaken || isEmailTaken) {
        let message;
        if (isUsernameTaken && isEmailTaken) {
            message = 'Email and Username already taken';
        } else if (isUsernameTaken) {
            message = 'Username already taken';
        } else if (isEmailTaken) {
            message = 'Email already taken';
        }
        res.status(responseStatus.BAD_REQUEST).json({message});
    }

    const passwordHash = await util.createHash(req.body.password);
    const createdUser = await userRepo.createUser({
        username: req.body.username,
        email: req.body.email,
        password: passwordHash,
        branchCode: req.body.branchCode,
        bankAccountName: req.body.bankAccountName,
        bankAccountNumber: req.body.bankAccountNumber,
        bankCode: req.body.bankCode
    } as User);
    res.status(responseStatus.SUCCESS).json({...createdUser, password: ''});
}

const verifyEmailAndPassword = async (req: Request, res: Response) => {
    const user = await userRepo.getUserByEmail(req.body.email);
    if (!user || !(await util.isHashMatch(req.body.password, user.password))) {
      res.status(responseStatus.UNAUTHORIZED).json({ message: 'Incorrect email or password' });
    }
    
    const accessToken = jwtHelper.generateAccessToken(user);
    // const refreshToken = jwtHelper.generateRefreshToken(user);
    
    // save user's refresh token
    // await userTokenRepo.createUserToken({
    //     userId: user._id,
    //     // refreshToken,
    //     isValid: true,
    // } as UserToken);
    const returnObject = {
        accessToken,
        // refreshToken,
        user: { 
            _id: user._id,
            username: user.username,
            email: user.email
        }
    };
    res.status(responseStatus.SUCCESS).json(returnObject);
}

const generateRefreshToken = async (req: Request, res: Response) => {
    const token = req.body.token;
    if (!token) res.status(responseStatus.FORBIDDEN).json({ message: "Access denied" });

    const userToken = await userTokenRepo.isUserTokenExist(token);
    if (!userToken) {
        res.status(responseStatus.UNAUTHORIZED).json({ message: 'Invalid Token' });
    } else {
        const payload = await jwtHelper.verifyRefreshToken(token) as User;
        const accessToken = jwtHelper.generateAccessToken(payload);
        res.status(responseStatus.SUCCESS).json({ accessToken });
    }
}

const getUserInformation = async (req: Request, res: Response) => {
    const user = await userRepo.getUserInformation(req.body.userId);
    res.status(responseStatus.SUCCESS).json(user);
}

const pingToken = async (req: Request, res: Response) => {
    res.status(responseStatus.SUCCESS).json({ message: 'The access token is valid!' });
}

const userController = {
    createUser,
    verifyEmailAndPassword,
    generateRefreshToken,
    getUserInformation,
    pingToken
};

export default userController;