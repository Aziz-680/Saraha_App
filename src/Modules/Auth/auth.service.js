import {User} from "../../DB/Models/index.js"
// import { encrypt, asymmetricEncryption , decrypt , asymmetricDecryption } from "../../Common/Security/encryption.js";
import { encrypt, asymmetricEncryption , decrypt , asymmetricDecryption , hash} from "../../common/index.js";

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
        Password:hashedPasswod,
        gender
    };

    if(phone){
        userObject.phoneNumber = asymmetricEncryption(phone);
    }

    return User.create(userObject);
}