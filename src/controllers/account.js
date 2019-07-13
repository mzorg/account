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
exports.createAccount = async (req, res, next) => {
    let userId;
    // If user is 'Admin' can create account for a given userId, if not,
    // you can create a account for yourself
    if (req.user.role == 'Admin') {
        userId = req.body.userId;
    } else {
        userId = req.user.id;
    }
    let account = new Account({
        userId: req.user.id
    });
    // Check if the user has already an account
    Account.find({userId}, (err, account) => {
        // If there was a error
        if (err) {
            err.status = 500;
            next(err);
        }
        // Check account existence
        if (account) {
            err.status = 401;
            next(new Error("The user has an account"));
        }
        // If account not exists, create a new one
        account.save(
            (err, accountDB) => {
            // If there was a error
            if (err) {
                err.status = 500;
                next(err);
            }
            // Return created order
            return res.json({
                ok: true,
                data: accountDB
            });
        });
    });
};
