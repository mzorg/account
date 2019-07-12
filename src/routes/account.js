const express = require('express');

const isAuth = require('../middleware/is-authenticated');
const accountController = require('../controllers/account');

const router = express.Router();

router.get('/accounts/:id/credit', accountController.checkCredit);
router.put('/accounts/:id/credit', accountController.setCredit);

module.exports = router;