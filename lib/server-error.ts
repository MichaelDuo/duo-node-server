/**
 * Low Level Error:    Caused by user.
 * Medium Level Error: Caused by user or server, but can be expected or not critical.
 * High Level Error:   Caused by server, unexpected error or critical error.
 */
export enum ErrorLevel { L, M, H }

export interface ErrorOption {
    statusCode? : number
    errorCode?  : number
    level?      : ErrorLevel
    message?    : string
    error?      : Error
}

export default class ServerError extends Error {
    statusCode         = 500
    errorCode          = 500
    level              = ErrorLevel.L
    message            = ""
    error?:Error       
    /**
     * 
     * @param options 
     * @param message 
     * Message For Overridding default message in code array
     */
    constructor(options:ErrorOption | Array<any>, message?:String){
        super()
        this.name = "ServerError"
        if (options instanceof Array) {
            this.statusCode = options[0]
            this.errorCode  = options[1]
            this.message    = message || options[2]
            if(options[3]) 
                this.level  = options[3]
            else if ( this.errorCode < 500 ) 
                this.level  = ErrorLevel.L
            else
                this.level  = ErrorLevel.H
        } else {
            this.statusCode = options.statusCode || this.statusCode
            this.errorCode  = options.errorCode  || this.errorCode
            this.level      = options.level      || this.level
            this.error      = options.error
            this.message    = options.message    || (this.error ? this.error.message : null) || this.message
        }
    }
}

export const code = {
    OK:                       [200, 200, 'OK', ErrorLevel.L],
    BAD_REQUEST:              [400, 400, 'Bad Request.', ErrorLevel.L],
    UNAUTHORIZED:             [401, 401, 'Unauthorized.', ErrorLevel.L],
    NOT_FOUND:                [404, 404, 'Not Found.', ErrorLevel.L],
    INTERNAL_SERVER_ERROR:    [500, 500, 'Internal server error.', ErrorLevel.H],
}