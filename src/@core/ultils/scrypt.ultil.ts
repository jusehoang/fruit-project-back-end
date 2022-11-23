import { promisify } from "util";
import { randomBytes, scrypt as _scrypt } from "crypto";

const scrypt = promisify(_scrypt);
export class Scrypt {
    static async generateEncodePassword(password: string) {
        const salt = randomBytes(16).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        return salt + '.' + hash.toString('hex');
    }

    static async isMatchPassword(passwordEncode: string, password: string) {
        const [salt, storeHash] = passwordEncode.split('.');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        return storeHash === hash.toString('hex');
    }
}