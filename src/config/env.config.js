import { config } from "dotenv";

config({ path: [`.${process.env.NODE_ENV}.env`, '.env'] });

const envConfig = {
    app: {
        NODE_ENV: process.env.NODE_ENV ?? 'dev',
        PORT: process.env.PORT ?? 8000
    },
    database: {
        MONGO_URL: process.env.MONGO_URL
    },
    encryption: {
        ENCRYPTION_KEY: process.env.ENC_KEY,
        IV_LENGTH: process.env.ENC_IV_LENGTH
    },
    jwt: {
        admin: {
            accessSignature: process.env.JWT_ACCESS_SECRET_ADMIN,
            accessExpiration: process.env.JWT_ACCESS_EXP_ADMIN
        },
        user: {
            accessSignature: process.env.JWT_ACCESS_SECRET_USER,
            accessExpiration: process.env.JWT_ACCESS_EXP_USER
        }
    }
};

export default envConfig;