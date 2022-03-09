const { workerData, parentPort } = require("worker_threads");
const Document = require("../models/Document");
const faker = require('faker');
const { hash } = require('../utils/cryptos');

//workerData will be the second argument of the Worker constructor in multiThreadServer.js
const quantity = workerData.quantity;

(async () => {
    for (var i = 1; i <= quantity; i++) {
        let encrypted_body = hash(faker.lorem.paragraphs(1000));
        Document.create({
            title: faker.lorem.sentence(),
            body: encrypted_body
        });
    }
})();

process.on('exit', function(code) {
    parentPort.postMessage({
        message: 'end'
    })
});



