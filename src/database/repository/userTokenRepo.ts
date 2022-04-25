import UserToken, { UserTokenModel } from "../model/UserToken";

const createUserToken = async (userToken: UserToken): Promise<UserToken> => {
    const now = new Date();
    userToken.createdAt = now;
    userToken.updatedAt = now;
    const createdUserToken = await UserTokenModel.create(userToken);
    return {
        _id: createdUserToken._id,
        userId: createdUserToken.userId,
        isValid: createdUserToken.isValid
    } as UserToken;
}

const isUserTokenExist = async (refreshToken: string): Promise<boolean> => {
    const isExist = await UserTokenModel.exists({refreshToken, isValid: true});
    return isExist;
}

const updateUserToken = async (userToken: UserToken): Promise<UserToken> => {
    const dbUserToken = await UserTokenModel.findById(userToken._id).lean<UserToken>();
    if (!dbUserToken) {
        // throw new ApiError(httpStatus.NOT_FOUND, 'User token not found');
    }
    const updatedUserToken = await UserTokenModel.findByIdAndUpdate(dbUserToken._id, { 
        $set: {
            isValid: userToken.isValid,
            updatedAt: new Date()
        }
    }).lean();
    return updatedUserToken as UserToken;
}

const userTokenRepo = {
    createUserToken,
    isUserTokenExist,
    updateUserToken
}

export default userTokenRepo;