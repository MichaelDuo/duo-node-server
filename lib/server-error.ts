export interface ErrorOption {
    statusCode? : number
    errorCode?  : number
    level?      : ErrorLevel
    message?    : string
    error?      : Error
}

export enum ErrorLevel { L, M, H }

export const code = {
    OK:                       [200, 200, 'OK'],
    INTERNAL_SERVER_ERROR:    [500, 500, 'Internal server error.'],
    NOT_FOUND:                [404, 404, 'Not Found.']
}

export default class ServerError extends Error {
    statusCode         = 500
    errorCode          = 500
    level              = ErrorLevel.L
    message            = ""
    error?:Error       
    
    constructor(options:ErrorOption | Array<any>){
        super()
        if (options instanceof Array) {
            this.statusCode = options[0]
            this.errorCode  = options[1]
            this.message    = options[2]
            if ( this.errorCode < 400 ) 
                this.level  = ErrorLevel.L
            else if ( this.errorCode < 500 ) 
                this.level  = ErrorLevel.M
            else
                this.level  = ErrorLevel.H
        } else {
            this.statusCode = options.statusCode || this.statusCode
            this.errorCode  = options.errorCode || this.errorCode
            this.level      = options.level || this.level
            this.error      = options.error
            this.message    = options.message || (this.error ? this.error.message : null) || this.message
        }
    }
}