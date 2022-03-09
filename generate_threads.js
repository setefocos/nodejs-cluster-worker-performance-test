const connection = require("./database/connection");
const { Worker } = require("worker_threads");
const numCPUs = require('os').cpus().length;

const startTime = new Date();

function runWorker(workerData) {
    return new Promise((resolve, reject) => {

      //first argument is filename of the worker  
      const worker = new Worker("./workers/generator_worker.js", {workerData})  
      worker.on("message", resolve) //This promise is gonna resolve when messages comes back from the worker thread
      worker.on("error", reject)
      worker.on("exit", code => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`))  
        }
      })
    })
  }

  // Fork workers.
function divideWork() {
    let workers = [];

    //allocating each worker seperate parts
    let piece = 5000 / numCPUs;    
    for (let i = 0; i < numCPUs; i++) {
        workers.push(runWorker({ quantity: piece }));
    }
    //Promise.all resolve only when all the promises inside the array has resolved;
    return Promise.all(workers)
}

function generate(){
    const startTime = new Date();
    divideWork().then(() => {
        const endTime = new Date();
        console.log("Total generation time: " + (endTime.getTime() - startTime.getTime())  + " ms.");
    });
}

//Database
connection
    .authenticate()
    .then(() => {
        generate();
    })
    .catch((err) => {
        console.log(err);
    });