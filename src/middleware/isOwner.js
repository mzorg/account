const Account = require('../models/account');

// =====================
// Verify Account ownership
// =====================
module.exports = async (req) => {
    return new Promise( (resolve, reject) =>{
        let userId = req.user.id;
        let accountId = req.params.id;
        // Verify if account belongs to logged user
        Account.findById(accountId, (err, account) => {
                if (err) {
                    return reject(err);
                }
                if (!account) {
                    let err = new Error('The account does not exists');
                    err.status = 404;
                    return reject(err);
                }
                if (account.userId == userId) {
                    return resolve(true);
                }
                // If logued userId is equals to account userId
                if (account.userId == userId) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            })
    });
};
