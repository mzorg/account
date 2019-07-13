
// ============================
//  SEED de autenticación
// ============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb+srv://matias:contra10@cluster0-jssy7.mongodb.net/accounts?retryWrites=true';
    process.env.DEBUG = true;
} else {
    urlDB = process.env.MONGO_URI;
    process.env.DEBUG = false;

}
process.env.URLDB = urlDB;

// ============================
//  Services 
// ============================

// Product service
module.exports = { 

}

