const express = require('express');

const Router = express.Router();

const { 
    allTalkers,
    getTalker,
    loginController,
    createTalker,
    updateTalker,
    deleteTalker,
    search,
    } = require('../Controllers/index.js');

const { verifyToken } = require('../Helpers/helper.js');

Router.route('/talker')
    .get(allTalkers)
    .post(verifyToken, createTalker);

Router.route('/talker/search')
    .get(verifyToken, search);

Router.route('/talker/:id')
    .get(getTalker)
    .put(verifyToken, updateTalker)
    .delete(verifyToken, deleteTalker);

Router.route('/login')
    .post(loginController);

module.exports = Router;