import { userRepo } from "../../DB/Repos/user.repo.js"
import { encrypt, asymmetricEncryption , decrypt , asymmetricDecryption } from "../../Common/Security/encryption.js";

export const getProfileService = async (id) => {
    const user = await userRepo.findById(id);

    if (!user) {
        throw new Error("User not found");
    }

    if (user.phoneNumber){
        user.phoneNumber = decrypt(user.phoneNumber)
    }

    return user
}
