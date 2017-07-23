import mongodbConfig from './mongodb-config'
export default class Config {
    public static db = mongodbConfig
    public static port:number = 3000
    public static hostname:string = "localhost"
    public static tokenSecret:string = "TokenSecret"
}