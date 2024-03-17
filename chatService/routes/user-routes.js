
const express = require('express');
const {
    addUser, getUserByEmail,getAllUser
} = require('../controllers/userController');

const router = express.Router();


//add user
router.post('/users', addUser);
router.get('/users', getAllUser);
router.post('/users/email', getUserByEmail);
module.exports = {
    routes: router
}