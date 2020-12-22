// Connects to .env file to extract enviorment varibles
require('dotenv').config();

const server = require('../server/server.js');

const port = process.env.PORT || 8000;

server.listen(port, () => {
    console.log(`\n <== Server is running on port ${port}! ==> \n`);
});