import { TOKEN_TYPES } from "../common/constants.js"
import { decodeToken } from "../Common/index.js"

export const authenticate = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        throw new Error("Authorization header is Required.", { cause: { status: 400 } })
    }

    const {user} = await decodeToken({ token, tokenType:TOKEN_TYPES.ACCESS })

    if (!user) {
        throw new Error("Invalid User Credentials, Please Register.", { cause: { status: 404 } })
    }

    req.user = user
    next()
}

export const authorize = (roles) => {
    return (req, res, next) => {
        const userRole = req.user.role
        if (!roles.includes(userRole)) {
            throw new Error("Unauthorized Access.", { cause: { status: 403 } })
        }
        next()
    }
}