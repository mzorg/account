const Account = require('../models/account');
const isOwner = require('../middleware/isOwner');
const axios = require('axios');
let conf = require('../config/config');

// =====================
// Check credit
// =====================
exports.checkCredit = async (req, res, next) => {
    // Check if user is the owner of account or is 'Admin'
    try {
        if (!await isOwner(req) || req.user.role !== 'Admin')
            throw new Error("You are not authorized to edit this account")
    } catch(err) {
        // Return error response
        err.status = 500;
        next(err);
    }

    let accountId = req.params.id;
    Account.findById(accountId)
        .then(account => {
            // Check account existence
            if (!account) {
                throw new Error("Account does not exist");
            }
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
exports.setCredit = async (req, res, next) => {
    // Check if user is the owner of account or is 'Admin'
    try {
        if (!await isOwner(req) || req.user.role !== 'Admin')
            throw new Error("You are not authorized to edit this account")
    } catch(err) {
        // Return error response
        err.status = 500;
        next(err);
    }

    let accountId = req.params.id;
    let body = req.body; // parse body request
    let amount = body.amount;
    Account.findOneAndUpdate({_id: accountId}, {credit: amount}, {new: true})
        .then(account => {
            // Check account existence
            if (!account) {
                throw new Error("Account does not exist");
            }
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
