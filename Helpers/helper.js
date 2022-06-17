const fs = require('fs');
const crypto = require('crypto-js');
const { Login, Talker } = require('../Models');

const readFile = (file) => {
    const output = JSON.parse(fs.readFileSync(`./${file}.json`));
    return output;
};

const writeFile = (file, info) => {
    const data = readFile(file);
    data.push(info);
    fs.writeFileSync(`./${file}.json`, JSON.stringify(data));    
};

const updateFile = (file, info) => {
    fs.writeFileSync(`./${file}.json`, JSON.stringify(info));
};

const loginValidate = (obj) => {
    const validate = Login.validate(obj);
    if (validate.error) throw new Error(validate.error.details[0].message);
};

const talkerValidate = (obj) => {
    const validate = Talker.validate(obj);
    if (validate.error) throw new Error(validate.error.details[0].message);
};

const genHash = async (password) => {
    const salt = crypto.lib.WordArray.random(128 / 8);
    const key = crypto.PBKDF2(password, salt, {
        keySize: 128 / 64,
      });
    return key.toString();
};

const verifyToken = (req, res, next) => {
    const reqToken = req.headers.authorization;
    if (!reqToken) return res.status(401).send({ message: 'Token não encontrado' });
    const tokenInfo = reqToken.split(' ');    
    let [, token] = tokenInfo;
    if (token === undefined) token = reqToken;
    const users = readFile('login');
    const user = users.find((usr) => usr.token === token);
    if (!user) return res.status(401).send({ message: 'Token inválido' });
    req.user = user;
    next();  
};

module.exports = { 
    loginValidate,
    genHash,
    readFile,
    writeFile,
    verifyToken,
    talkerValidate,
    updateFile,
};