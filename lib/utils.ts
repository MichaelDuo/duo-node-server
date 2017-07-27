import * as crypto from 'crypto'
export function hashString(data:string){
    return crypto.createHash('sha256').update(data).digest('hex')
}