
// =====================
// Verify Account ownership
// =====================
module.exports = (req, res, next) => {

    let userId = req.user.id;
    let accountId = req.params.id;
    // Verify if account belongs to logged user
    Account.find({_id: accountId})
        .then(account => {
            // If logued userId is equals to account userId
            if (account.userId == userId) {
                next();
            } else {
                throw new Error("You are not authorized to edit this account")
            }
        })
        .catch(err => {
            // Return error response
            err.status = 500;
            next(err);
        });
};
