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
                    reject(err);
                }
                if (!account) {
                    let err = new Error('The account does not exists');
                    err.status = 404;
                    reject(err);
                }
                if (account.userId == userId) {
                    resolve(true);
                }
                // If logued userId is equals to account userId
                if (account.userId == userId) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
    });
};
