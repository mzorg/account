const express = require('express');

const isAuth = require('../middleware/is-authenticated');
const isOwner = require('../middleware/isOwner');
const accountController = require('../controllers/account');

const router = express.Router();

router.post('/accounts/',isAuth ,accountController.createAccount);
router.get('/accounts/:id/credit', accountController.checkCredit);
router.put('/accounts/:id/credit', accountController.setCredit);

module.exports = router;