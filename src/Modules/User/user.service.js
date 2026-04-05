import { User } from "../../DB/Models/index.js"
import { encrypt, asymmetricEncryption , decrypt , asymmetricDecryption } from "../../Common/Security/encryption.js";

export const getProfileService = async (id) => {
    const user = await User.findById(id)

    if (user.phoneNumber){
        user.phoneNumber = asymmetricDecryption(user.phoneNumber)
    }

    return user

}


