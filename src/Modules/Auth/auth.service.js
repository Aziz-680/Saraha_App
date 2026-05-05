import { TOKEN_TYPES } from "../../common/constants.js";
import { encrypt, decrypt, hash, compare, createLoginToken, decodeToken, HttpAppError, ConflictException } from "../../Common/index.js";
import envConfig from "../../config/env.config.js";
import { userRepo } from './../../DB/Repos/user.repo.js';


const jwtSecrets = envConfig.jwt

export const registerService = async (body) => {
    const { firstName, lastName, email, Password, gender, phone, role } = body;

    const checkEmailDuplication = await userRepo.findOne({ email }, "email");

    if (checkEmailDuplication) {
        throw new ConflictException("Email Already Exists"  , {duplicatedEmail:email})
    }

    const hashedPassword = await hash(Password)

    const userObject = {
        firstName,
        lastName,
        email,
        Password: hashedPassword,
        gender,
        role
    };

    if (phone) {
        userObject.phoneNumber = encrypt(phone);
    }

    return userRepo.create(userObject);
}

export const loginService = async (body) => {
    const { email, Password } = body;

    const user = await userRepo.findOne({ email });

    if (!user) {
        throw new Error("Invalid Email or Password", { cause: { status: 401 } });
    }

    const isPasswordValid = await compare(Password, user.Password)

    if (!isPasswordValid) {
        throw new Error("Invalid Email or Password", { cause: { status: 401 } });
    }

    let tokenPayload = { _id: user._id, email, role: user.role }
    const { accessToken , refreshToken} = createLoginToken({
        payload:tokenPayload,
        options: {
            access:{expiresIn: jwtSecrets[user.role].accessExpiration},
            refresh:{expiresIn: jwtSecrets[user.role].refreshExpiration}
        }
    })
    return {accessToken , refreshToken};
}

export const refreshTokenService = async (header) => {

    const {authorization:refreshToken} = header

    const {decodedData} = await decodeToken({token:refreshToken , tokenType:TOKEN_TYPES.REFRESH})

    console.log(decodedData);
    

    const {accessToken} = createLoginToken({
        payload:{ _id:decodedData._id , role:decodedData.role , email:decodedData.email},
        options: {
            access:{expiresIn: jwtSecrets[decodedData.role].accessExpiration}
        },
        requiredToken:TOKEN_TYPES.ACCESS
    })
    return{accessToken}
}