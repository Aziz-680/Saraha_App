import {User} from "../../DB/Models/index.js"

export const registerService = async (body) => {
    const { firstName, lastName, email, Password, gender } = body;

    const checkEmailDuplication = await User.findOne({email}).select("email");

    if (checkEmailDuplication) {
        throw new Error ("Email already exists", {cause:{status:409}});
    }

    return User.create({
        firstName,
        lastName,
        email,
        Password,
        gender
    });
}