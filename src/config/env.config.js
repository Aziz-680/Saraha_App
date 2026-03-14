import {config} from "dotenv";

config({path :[` .${process.env.NODE_ENV}.env`, '.env']});

const envConfig = {
    app:{
        NODE_ENV: process.env.NODE_ENV ?? 'dev',
        PORT: process.env.PORT ?? 8000 
    },
    database:{
        MONGO_URL:process.env.MONGO_URL
    },
    encryption:{
        ENCRYPTION_KEY: process.env.ENCRYPTION_KEY ?? 'default-encryption-key'
    }
};

export default envConfig;