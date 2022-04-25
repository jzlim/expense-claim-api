import { Types } from "mongoose";
import logger from "../../core/logger";
import User, { UserModel } from "../model/User";

const getUserById = async (id: Types.ObjectId): Promise<User> => {
    try {
        const user = await UserModel.findById(id)
            .select('username email password')
            .lean<User>();
        if (!user) {
            logger.info(`User not found Object Id: ${id}`);
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw error;
    }
}

const getUserByEmail = async (email: string): Promise<User> => {
    try {
        const user = await UserModel.findOne({ email })
            .select('username email password')
            .lean<User>();
        return user;
    } catch (error) {
        throw error;
    }
}

const verifyIsEmailTaken = async (email: string, excludeUserId: any = null): Promise<boolean> => {
    try {
        const user = await UserModel.findOne({ email, _id: { $ne: excludeUserId } });
        return !!user;
    } catch (error) {
        throw error;
    }
};

const verifyIsUsernameTaken = async (username: string, excludeUserId: any = null): Promise<boolean> => {
    try {
        const user = await UserModel.findOne({ username, _id: { $ne: excludeUserId } });
        return !!user;
    } catch (error) {
        throw error;
    }
};

const createUser = async (user: User): Promise<User> => {
    try {
        const now = new Date();
        user.createdAt = now;
        user.updatedAt = now;
        const createdUser = await UserModel.create(user);
        return {
            _id: createdUser._id,
            username: createdUser.username,
            email: createdUser.email,
            fullName: createdUser.fullName,
            branchCode: createdUser.branchCode,
            bankAccountName: createdUser.bankAccountName,
            bankAccountNumber: createdUser.bankAccountNumber,
            bankCode: createdUser.bankCode
        } as User;
    } catch (error) {
        throw error;
    }
}

const updateUser = async (user: User): Promise<User> => {
    try {
        const dbUser = await getUserById(user._id);
        if (!dbUser) {
            throw new Error('User not found');
        }
        if (user.username && (await verifyIsUsernameTaken(user.username, user._id))) {
            throw new Error('Username already taken');
        }
        if (user.email && (await verifyIsEmailTaken(user.email, user._id))) {
            throw new Error('Email already taken');
        }

        const updatedUser = await UserModel.findByIdAndUpdate(dbUser.id, {
            $set: {
                username: user.username,
                email: user.email,
                branchCode: user.branchCode,
                bankAccountName: user.bankAccountName,
                bankAccountNumber: user.bankAccountNumber,
                bankCode: user.bankCode,
                updatedAt: new Date()
            }
        }).lean();
        return updatedUser as User;
    } catch (error) {
        throw error;
    }
}

const deleteUser = async (user: User): Promise<boolean> => {
    try {
        const dbUser = await getUserById(user._id);
        if (!dbUser) {
            throw new Error('User not found');
        }

        const deletedUser = await UserModel.findByIdAndUpdate(dbUser._id, {
            $set: {
                isDeleted: true,
                updatedAt: new Date()
            }
        }).lean();
        return !!deletedUser;
    } catch (error) {
        throw error;
    }
}

const getUserInformation = async (userId: string): Promise<User> => {
    try {
        const user = await UserModel.findById(userId)
            .select('fullName branchCode bankAccountNumber bankAccountName bankCode')
            .lean<User>();
        if (!user) {
            logger.info(`User not found Object Id: ${userId}`);
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw error;
    }
}

const userRepo = {
    getUserById,
    getUserByEmail,
    verifyIsEmailTaken,
    verifyIsUsernameTaken,
    createUser,
    updateUser,
    deleteUser,
    getUserInformation
}
export default userRepo;