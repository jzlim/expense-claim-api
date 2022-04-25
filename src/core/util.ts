import bcrypt from 'bcrypt';

const createHash = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

const isHashMatch = async (password: string, encryptedPassword: string): Promise<boolean> => {
    let result = false;
    result = await bcrypt.compare(password, encryptedPassword);
    return result;
}

const util = {
    createHash,
    isHashMatch
};

export default util;