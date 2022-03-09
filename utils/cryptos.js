//Checking the crypto module
const crypto = require('crypto');
const algorithm = 'aes-256-cbc'; //Using AES encryption
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

//Encrypting text
function encrypt(text) {
   let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
   let encrypted = cipher.update(text);
   encrypted = Buffer.concat([encrypted, cipher.final()]);
   return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

// Decrypting text
function decrypt(text) {
   let iv = Buffer.from(text.iv, 'hex');
   let encryptedText = Buffer.from(text.encryptedData, 'hex');
   let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
   let decrypted = decipher.update(encryptedText);
   decrypted = Buffer.concat([decrypted, decipher.final()]);
   return decrypted.toString();
}

function hash (text) {
  return crypto.createHash('md5').update(text).digest('hex');
}

module.exports = {
    encrypt, decrypt, hash
}


/*const {
    scrypt,
    randomFill,
    createCipheriv
  } = require('crypto');
  
  const algorithm = 'aes-192-cbc';
  const password = 'Password used to generate key';
  
  
function encrypt(text) {
  var encrypted = "teste";
  // First, we'll generate the key. The key length is dependent on the algorithm.
  // In this case for aes192, it is 24 bytes (192 bits).
  scrypt(password, 'salt', 24, (err, key) => {
    if (err) throw err;
    // Then, we'll generate a random initialization vector
    randomFill(new Uint8Array(16), (err, iv) => {
      if (err) throw err;
  
      const cipher = createCipheriv(algorithm, key, iv);

      console.log("!" + encrypted);
  
      encrypted = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');

      console.log("?" + encrypted);
      
    }).then(()=> console.log('estou dentro do then'));
  });
  console.log(":" + encrypted);

  return encrypted;
}

console.log('e agora?' + encrypt('opaaaa'));
*/


/*const crypto = require('crypto');

function encrypt(text) {
    let algorithm = 'aes-256-ctr';
    let password = 'Password used to generate key';
    // Key length is dependent on the algorithm. In this case for aes192, it is
    // 24 bytes (192 bits).
    // Use async `crypto.scrypt()` instead.
    let key = crypto.scryptSync(password, 'salt', 32);
    // Use `crypto.randomBytes()` to generate a random iv instead of the static iv
    // shown here.
    let iv = Buffer.alloc(16, 0); // Initialization vector.

    let cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = '';
    cipher.on('readable', () => {
        let chunk;
        while (null !== (chunk = cipher.read())) {
        encrypted += chunk.toString('hex');
        }
    });
    cipher.on('end', () => {
        return encrypted;
    });

    return cipher.write(text);
}

module.exports = {
    encrypt,
};*/