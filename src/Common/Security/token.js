import jwt from 'jsonwebtoken'
import envConfig from "../../config/env.config.js";
import { userRepo } from '../../DB/Repos/user.repo.js';
import { decrypt } from './encryption.js';
import { TOKEN_TYPES, USER_ROLES } from '../../common/constants.js';

const jwtSecrets = envConfig.jwt

export const generateToken = ({ payload, secret, options }) => {
    return jwt.sign(payload, secret, options)
}

export const verifyToken = ({ token, secret, options }) => {
    return jwt.verify(token, secret, options)
}

export const createLoginToken = ({ payload, options, requiredToken }) => {

    const signatures = getSignatureByTypeAndRole({ role: payload.role, both: true })

    let accessToken, refreshToken;

    switch (requiredToken) {
        case TOKEN_TYPES.ACCESS:
            accessToken = generateToken({
                payload,
                secret: signatures.accessSignature,
                options: options.access
            })
            break;
        case TOKEN_TYPES.REFRESH:
            refreshToken = generateToken({
                payload,
                secret: signatures.refreshSignature,
                options: options.refresh
            })
            break;

        default:
            accessToken = generateToken({
                payload,
                secret: signatures.accessSignature,
                options: options.access
            }),
            refreshToken = generateToken({
                payload,
                secret: signatures.refreshSignature,
                options: options.refresh
            })
            break;
    }



    return { accessToken, refreshToken }
}

// Decode the token and data
export const decodeToken = async ({ token, tokenType }) => {
    const data = jwt.decode(token);
    
    // Check if data is null first!
    if (!data || !data.role) {
        throw new Error('Invalid Payload', { cause: { status: 400 } });
    }
    const signature = getSignatureByTypeAndRole({ role: data.role, tokenType })

    const decodedData = verifyToken({ token, secret: signature })

    const user = await userRepo.findById(decodedData._id);

    if (!user) throw new Error("User not found");

    if (user) {
        user.phoneNumber = decrypt(user.phoneNumber);
    }

    return { user, decodedData }
}

export const detectSignatureByRole = ({ role }) => {
    let signatures;
    if (role == USER_ROLES.USER) {
        signatures = jwtSecrets.user
    } else { signatures = jwtSecrets.admin }

    return signatures
}

export const getSignatureByTypeAndRole = ({ role, tokenType, both = false }) => {
    const signatures = detectSignatureByRole({ role })

    if (both) return signatures
    let tokenSignature;
    switch (tokenType) {

        case TOKEN_TYPES.ACCESS:
            tokenSignature = signatures.accessSignature
            break;

        case TOKEN_TYPES.REFRESH:
            tokenSignature = signatures.refreshSignature
            break;

        default:
            throw new Error('Invalid Token Type', { cause: { status: 400 } })
    }
    return tokenSignature
}



