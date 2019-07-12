const express = require('express');

const app = express();

app.use(require('./health'));
app.use(require('./account'));

module.exports = app;