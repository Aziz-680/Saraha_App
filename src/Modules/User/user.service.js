const jwtSecrets = envConfig.jwt

import envConfig from "../../config/env.config.js";
import { userRepo } from "../../DB/Repos/user.repo.js"
import { encrypt, decrypt, decodeToken } from "../../Common/index.js";

// 1. GET ONE USER DECODED + TOKENIZED
export const getProfileService = async (headers) => {

    const accessToken = headers.authorization

    return decodeToken({ token: accessToken })
}
