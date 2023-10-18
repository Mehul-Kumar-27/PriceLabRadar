import User, { UserDocument } from "../models/user.mongoose";

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

async function validateUserPasword(email: string, password: string) {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return false;
    } else {
      const isValid = await user.comparePassword(password);
      if (!isValid) return false;

      return user.toJSON();
    }
  } catch (error: any) {
    throw new Error(error);
  }
}

async function getAllUser() {
  try {
    const users = await User.find();

    return users.map((user) => {
      const { password, ...userWithoutPassword } = user.toJSON();
      return userWithoutPassword;
    });
  } catch (error: any) {
    throw new Error(error);
  }
}

export { createUser, validateUserPasword, getAllUser };
