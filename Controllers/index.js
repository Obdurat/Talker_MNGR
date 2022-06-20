const { readFile } = require('../Helpers/helper.js');

const {
    loginValidate,
    genHash, writeFile,
    talkerValidate,
    updateFile,
} = require('../Helpers/helper.js');

const allTalkers = (req, res) => {
    try {
        return res.status(200).send(readFile('talker'));
    } catch (err) {
        return res.status(400).send({ message: err.message });
    }
};

const getTalker = (req, res) => {
    try {
        const { id } = req.params;
        const talker = readFile('talker').find((talk) => talk.id === +id);
        if (talker) {
            return res.status(200).send(talker);            
        }
        return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
    } catch (err) {
        return res.status(400).send({ message: err.message });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        loginValidate(req.body);
        const token = await genHash(password);        
        writeFile('login', { email, token });
        return res.status(200).send({ token });
    } catch (err) {
        return res.status(400).send({ message: err.message });
    }
};

const createTalker = (req, res) => {
    try {
        talkerValidate(req.body);
        const insert = { ...req.body, id: readFile('talker').length + 1 };
        writeFile('talker', insert);
        return res.status(201).send(insert);
    } catch (err) {
        return res.status(400).send({ message: err.message });
    }    
};

const updateTalker = (req, res) => {
    try {
        talkerValidate(req.body);
        const talkerId = req.params.id;
        const talkers = readFile('talker');
        const talker = talkers.findIndex((talk) => talk.id === +talkerId);
        talkers[talker] = { ...talkers[talker], ...req.body };
        updateFile('talker', talkers);
        return res.status(200).send(talkers[talker]);
    } catch (err) {
        return res.status(400).send({ message: err.message });
    }
};

const deleteTalker = (req, res) => {
    try {
        const talkerId = req.params.id;
        const talkers = readFile('talker');
        const talker = talkers.findIndex((talk) => talk.id === +talkerId);
        talkers.splice(talker, 1);
        updateFile('talker', talkers);
        return res.status(204).send();
    } catch (err) {
        return res.status(400).send({ message: err.message });
    }
};

const search = (req, res) => {
    try {
        const { q } = req.query;
        const talkers = readFile('talker');
        const talker = talkers.filter((talk) => talk.name.toLowerCase().includes(q.toLowerCase()));
        return res.status(200).send(talker);
    } catch (err) {
        return res.status(400).send({ message: err.message });
    }
};

module.exports = { 
    allTalkers,
    getTalker,
    loginController, 
    createTalker, 
    updateTalker, 
    deleteTalker,
    search,
};