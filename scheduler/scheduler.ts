/**
 * Example Usage:
 * let scheduler = new Scheduler()
 * let job = scheduler.schedule(()=>console.log("Scheduled Every 5sec"), 5000)
 *  .onError(()=>{
 *      job.stop()
 *  })
 */
export default class Scheduler {
    jobs:Job[] = []

    public stopAll(){
        this.jobs.forEach((job:Job)=>job.stop())
    }

    public schedule(task:Function, interval:number){
        let j = new Job(task, interval)
        this.jobs.push(j)
        return j
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