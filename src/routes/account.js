const express = require('express');

const isAuth = require('../middleware/is-authenticated');
const authorize = require('../middleware/authorize');
const accountController = require('../controllers/account');

const router = express.Router();

router.post('/accounts/',[isAuth, authorize(['Admin'])] ,accountController.createAccount);
router.get('/accounts/:id/credit', isAuth, accountController.checkCredit);
router.put('/accounts/:id/credit', isAuth, accountController.setCredit);

module.exports = router;