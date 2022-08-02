const {format}  = require("date-fns")
const {v4:uuid}  = require("uuid")
const fs = require("fs")
const fsPromisify  = require("fs").promises
const path   = require("path")
console.log(__dirname,__filename)
const logEvent  = async (message)=>{
    const dateTime  = `${format(new Date(),'yyyy-mm-dd\t\tHH:mm:ss')}`
    const  logItem  = `\n${dateTime}\t${uuid()}\t${message}`
    console.log(logItem, `\nfrom ${__dirname}`)
      try {
        if(!fs.existsSync(path.join(__dirname,'logs'))){
            await  fsPromisify.mkdir(path.join(__dirname,'logs'))
        }
        await  fsPromisify.appendFile(path.join(__dirname,'eventLog.text'),logItem)
      } catch (error) {
        console.log(error,'is error from',__dirname) 
      }
}

module.exports = logEvent;