const Document = require("./models/Document");
const faker = require('faker');

console.log(faker.lorem.paragraphs(10));

//Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

const { encrypt, decrypt } = require('./utils/cryptos');

Document.create({
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(10)
}).then(() => {});

const startTime = new Date().getTime();
const hash = encrypt.write(`texto a ser encriptado aqui.`);
encrypt.end();
const endTime = new Date().getTime()
console.log(hash);
console.log((endTime - startTime)  + " second(s).");
// const text = decrypt(hash);