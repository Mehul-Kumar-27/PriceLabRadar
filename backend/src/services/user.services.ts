import User , { UserDocument } from '../models/user.mongoose';

async function createUser(userData: UserDocument): Promise<UserDocument> {
    try {
        const user = new User(userData);
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error(`User with email ${userData.email} already exists`);
        }
        await user.save();
        return user;
    } catch (error) {
        throw new Error(`Error creating user: ${error}`);
    }
}

export { createUser };
