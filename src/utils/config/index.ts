import * as dotenv from "dotenv";


dotenv.config();


export const PORT = process.env.PORT || 5000;

export const DB = {
    "database": process.env.DB_NAME,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "options": {
        "host": process.env.DB_HOST,
        "dialect": process.env.DB_DIALECT,
        "port": process.env.DB_PORT,
        "operatorsAliases": false
    }
}

export const Authentication = {
        SecretKey : process.env.AUTHENTICATION_STB_SECRET_KEY
}
