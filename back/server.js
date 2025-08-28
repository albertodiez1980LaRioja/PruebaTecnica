
const app = require('./app.js');

const config = require('./config/config.js');

function main() {
    app.listen(config.expressPort);
    console.log('servidor levantado en el ', config.expressPort);
};

main();