import jwt from 'jsonwebtoken'
import envConfig from "../../config/env.config.js";
import { userRepo } from '../../DB/Repos/user.repo.js';
import { decrypt } from './encryption.js';
import { USER_ROLES } from '../../common/constants.js';

const jwtSecrets = envConfig.jwt

export const generateToken = ({ payload, secret, options }) => {
    return jwt.sign(payload, secret, options)
}

export const verifyToken = ({ token, secret, options }) => {
    return jwt.verify(token, secret, options)
}

export const createLoginToken = ({ payload, secret, options }) => {
    const accessToken = generateToken({
        payload,
        secret: secret || jwtSecrets.user.accessSignature,
        options
    }
    )
    return { accessToken }
}

// Decode the token and data
export const decodeToken = async ({ token }) => {
    const data = jwt.decode(token)
    if (!data.role) throw new Error ('Invalid Payload' , {cause: {status:400}})
    
    const {accessSignature} = detectSignatureByRole({role:data.role})
    console.log({accessSignature});

    const decodedData = verifyToken({ token, secret:accessSignature })

    const user = await userRepo.findById(decodedData.sub);
    
    if (!user) throw new Error("User not found");

    if (user) {
        user.phoneNumber = decrypt(user.phoneNumber);
        return user;
    }

    return userRepo.findById(decodedData.sub)
}

export const detectSignatureByRole = ({role}) => {
    let signatures;
    if (role == USER_ROLES.USER){
        signatures = jwtSecrets.user
    }else {signatures = jwtSecrets.admin }

    return signatures
}






