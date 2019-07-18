const express = require('express');

const isAuth = require('../middleware/is-authenticated');
const authorize = require('../middleware/authorize');
const accountController = require('../controllers/account');

const router = express.Router();

router.post('/accounts/', [isAuth, authorize(['Admin', 'Owner'])], accountController.createAccount);
router.get('/accounts/:id/credit', [isAuth, authorize(['Admin', 'Owner'])], accountController.checkCredit);
router.get('/accounts/user/:userId', [isAuth], accountController.getAccountId);
router.put('/accounts/:id/credit', [isAuth, authorize(['Admin', 'Owner'])], accountController.setCredit);

module.exports = router;