import crypto from "node:crypto";
import fs from 'node:fs'
import envConfig from "../../config/env.config.js";





const encryptionEnv = envConfig.encryption;

const encryptionKey = Buffer.from(encryptionEnv.ENCRYPTION_KEY, 'hex')

export const encrypt = (plainText) => {
    const iv = crypto.randomBytes(parseInt(encryptionEnv.IV_LENGTH))

    const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv)

    let encrypted = cipher.update(plainText, 'utf-8', 'hex')

    encrypted += cipher.final('hex')

    return `${iv.toString('hex')}:${encrypted}`
}

export const decrypt = (inputCipher) => {
    const [iv, encryptedData] = inputCipher.split(':')
    const bufferedIv = Buffer.from(iv, 'hex')

    const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, bufferedIv)

    let decrypted = decipher.update(encryptedData, 'hex', 'utf-8')

    decrypted += decipher.final('utf-8')

    return decrypted
}

if (fs.existsSync('publicKey.pem') && fs.existsSync('privateKey.pem')) {
    console.log('Key Already Generated');
} else {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        }
    })

    fs.writeFileSync('publicKey.pem', publicKey)
    fs.writeFileSync('privateKey.pem', privateKey)
}

export const asymmetricEncryption = (text) => {
    const publicKey = fs.readFileSync('publicKey.pem', 'utf-8')

    const bufferedText = Buffer.from(text)

    const encryptedData = crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
        }, bufferedText
    )

    return encryptedData.toString('hex')
}

export const asymmetricDecryption = (text) => {
    const privateKey = fs.readFileSync('privateKey.pem', 'utf-8')

    const buffer = Buffer.from(text, 'hex')

    const decryptedData = crypto.privateDecrypt(
        {
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
        }, buffer
    )

    return decryptedData.toString('utf-8')
}