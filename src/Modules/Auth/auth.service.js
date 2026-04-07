import {User} from "../../DB/Models/index.js"
// import { encrypt, asymmetricEncryption , decrypt , asymmetricDecryption } from "../../Common/Security/encryption.js";
import { encrypt, asymmetricEncryption , decrypt , asymmetricDecryption , hash} from "../../Common/index.js";

export const registerService = async (body) => {
    const { firstName, lastName, email, Password, gender, phone } = body;

    const checkEmailDuplication = await User.findOne({email}).select("email");

    if (checkEmailDuplication) {
        throw new Error ("Email already exists", {cause:{status:409}});
    }

    const hashedPassword = await hash(Password)

    const userObject = {
        firstName,
        lastName,
        email,
        Password:hashedPassword,
        gender
    };

    if(phone){
        userObject.phoneNumber = encrypt(phone);
    }

    return User.create(userObject);
}