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
        let ownership = await isOwner(req);
        if (!ownership && req.user.role != 'Admin')
            throw new Error("You are not authorized to edit this account")
    } catch(err) {
        // Return error response
        err.status = 401;
        next(err);
    } 

    let accountId = req.params.id;
    Account.findById(accountId, (err, account) => {
        // Check account existence again
        if (!account) {
            let err = new Error("Account does not exists");
            err.status = 404;
            return next(err);
        }
        // Return account
        return res.json({
            ok: true,
            data: {
                credit: account.credit
            }
        });
    })
};

// =====================
// Increase credit
// =====================
exports.setCredit = async (req, res, next) => {
    // Check if user is the owner of account or is 'Admin'
    try {
        let ownership = await isOwner(req);
        if (!ownership && req.user.role != 'Admin')
            throw new Error("You are not authorized to edit this account")
    } catch(err) {
        // Return error response
        err.status = 401;
        next(err);
    } 

    let accountId = req.params.id;
    let body = req.body; // parse body request
    let amount = body.amount;
    Account.findOneAndUpdate({_id: accountId}, {credit: amount}, {new: true}, (err, account) => {
        // Check errors
        if (err) {
            err.status = 500;
            return next(err);
        }
        // Check account existence
        if (!account) {
            let err = new Error("The user has an account");
            err.status = 400;
            return next(err);
        }
        // Return account
        return res.json({
            ok: true,
            data: {
                credit: account.credit
            }
        });
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
    let accountNew = new Account({
        userId
    });
    // Check if the user has already an account
    Account.findOne({userId}, (err, account) => {
        // If there was a error
        if (err) {
            err.status = 500;
            return next(err);
        }
        // Check account existence
        if (account) {
            let err = new Error("The user has an account");
            err.status = 400;
            return next(err);
        }
        // If account not exists, create a new one
        accountNew.save(
            (err, accountDB) => {
            // If there was a error
            if (err) {
                err.status = 500;
                return next(err);
            }
            // Return created order
            return res.json({
                ok: true,
                data: accountDB
            });
        });
    });
};
