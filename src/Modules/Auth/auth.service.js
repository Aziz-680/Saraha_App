import {User} from "../../DB/Models/index.js"
import { encrypt } from "../../Utils/encryption.utils.js";

export const registerService = async (body) => {
    const { firstName, lastName, email, Password, gender, phone } = body;

    const checkEmailDuplication = await User.findOne({email}).select("email");

    if (checkEmailDuplication) {
        throw new Error ("Email already exists", {cause:{status:409}});
    }

    const userObject = {
        firstName,
        lastName,
        email,
        Password,
        gender
    };

    if(phone){
        userObject.phoneNumber = encrypt(phone);
    }

    return User.create(userObject);
}