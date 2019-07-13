const Account = require('../models/account');
const axios = require('axios');
let conf = require('../config/config');

// =====================
// Check credit
// =====================
exports.checkCredit = (req, res, next) => {
    let accountId = req.params.id;
    Account.find({_id: accountId})
        .then(account => {
            // Return account
            return res.json({
                ok: true,
                data: {
                    credit: account.credit
                }
            });
        })
        .catch(err => {
            // Return error response
            err.status = 500;
            next(err);
        });
};

// =====================
// Increase credit
// =====================
exports.setCredit = (req, res, next) => {
    let accountId = req.params.id;
    let body = req.body; // parse body request
    let amount = body.amount;
    Account.findOneAndUpdate({_id: accountId}, {credit: amount})
        .then(account => {
            // Return account
            return res.json({
                ok: true,
                data: {
                    credit: account.credit
                }
            });
        })
        .catch(err => {
            // Return error response
            err.status = 500;
            next(err);
        });
};

// =====================
// Create account
// =====================
exports.createAccount = (req, res, next) => {
    let account = new Account({
        userId: req.user.id
    });
    account.save(
        (err, accountDB) => {
        // If there was a error
        if (err)
            err.status = 500;
            next(err);
        // Return created order
        return res.json({
            ok: true,
            data: accountDB
        });
    });
};
