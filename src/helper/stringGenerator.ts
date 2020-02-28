import md5 from 'md5'
var randtoken = require('rand-token');

function randomPassword(): string {
    let randomString = randtoken.generate(16);
    return md5(randomString)
}


export{
    randomPassword
}