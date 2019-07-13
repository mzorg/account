const Account = require('../models/account');
// =====================
// Verify Account ownership
// =====================
module.exports = async (req) => {
    return new Promise( (resolve, reject) =>{
        let userId = req.user.id;
        let accountId = req.params.id;
        // Verify if account belongs to logged user
        Account.findById(accountId)
            .then(account => {
                // If logued userId is equals to account userId
                if (account.userId == userId) {
                    resolve(true);
                } else {
                    reject(false);
                }
            })
    });
};
