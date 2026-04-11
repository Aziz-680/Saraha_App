import { encrypt, decrypt, hash, compare, createLoginToken } from "../../Common/index.js";
import envConfig from "../../config/env.config.js";
import { userRepo } from './../../DB/Repos/user.repo.js';


const jwtSecrets = envConfig.jwt

export const registerService = async (body) => {
    const { firstName, lastName, email, Password, gender, phone , role } = body;

    const checkEmailDuplication = await userRepo.findOne({ email }, "email");

    if (checkEmailDuplication) {
        throw new Error("Email already exists", { cause: { status: 409 } });
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

    const user = await userRepo.findOne({ email }, "email");

    if (!user) {
        throw new Error("Invalid Email or Password", { cause: { status: 401 } });
    }

    const isPasswordValid = await compare(Password, user.Password)

    if (!isPasswordValid) {
        throw new Error("Invalid Email or Password", { cause: { status: 401 } });
    }

    const accessToken = createLoginToken({
        payload: { sub: user._id, email , role:user.role  },
        secret: jwtSecrets.user.accessSignature,
        options: {
            expiresIn: jwtSecrets.user.accessExpiration,
            audience: ['web', 'mobile']
        }
    })
    return accessToken;
}