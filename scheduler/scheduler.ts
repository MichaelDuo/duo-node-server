export default class Scheduler {
    public static schedule(task:Function, interval:number){
        return new Job(task, interval)
    }
}

export class Job {
    task:Function
    interval:number
    valid:boolean = true
    errorHandler:Function

    constructor(task:Function, interval:number){
        this.task = task
        this.interval = interval
        this.run()
    }

    public run():Promise<any>{
        if(this.valid){
            return Promise.resolve()
                    .then(()=>this.task())
                    .catch((err)=>this.error(err))
                    .then(()=>new Promise((resolve)=>setTimeout(resolve, this.interval)))
                    .then(()=>this.run())
        } else {
            return Promise.resolve()
        }
    }

    public stop(){
        this.valid = false
        return this
    }

    public start(){
        if(!this.valid){
            this.valid = true
            this.run()
        }
    }

    public onError(handler:Function){
        this.errorHandler = handler
        return this
    }

    private error(err:any){
        this.errorHandler ? this.errorHandler(err) : null
    }
}