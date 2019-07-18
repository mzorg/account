const Account = require('../models/account');
let conf = require('../config/config');

// =====================
// Check credit
// =====================
exports.checkCredit = async (req, res, next) => {
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

// =====================
// Get accountId for a given userId
// =====================
exports.getAccountId = async (req, res, next) => {
    let userId = req.params.userId;
    Account.findOne({userId}, (err, account) => {
        // If there was a error
        if (err) {
            err.status = 500;
            return next(err);
        }
        // Check account existence
        if (!account) {
            let err = new Error("The user does not have an account");
            err.status = 400;
            return next(err);
        }
        // Return accountId
        return res.json({
            ok: true,
            data: {
                accountId: account._id
            }
        });
    });
}
