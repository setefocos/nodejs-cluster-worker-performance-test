const connection = require("./database/connection");
const Document = require("./models/Document");
const faker = require('faker');
const { hash } = require('./utils/cryptos');

const startTime = new Date();

function generate(){
    (async () => {
      for (var i = 1; i <= 5000; i++) {
          let encrypted_body = hash(faker.lorem.paragraphs(1000));
          Document.create({
              title: faker.lorem.sentence(),
              body: encrypted_body
          });
      }
      
  })();
}

process.on('exit', function(code) {
    const endTime = new Date();
    return console.log("Total generation time: " + (endTime.getTime() - startTime.getTime())  + " ms.");
});

//Database
connection
    .authenticate()
    .then(() => {

        generate();
    })
    .catch((err) => {
        console.log(err);
    });