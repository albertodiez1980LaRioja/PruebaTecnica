const Sequelize = require("sequelize");
const config = require('./../../config/config.js');

const sequelize = new Sequelize(
    config.sequelize.db,
    config.sequelize.user,
    config.sequelize.pass, {
    host: config.sequelize.host,
    dialect: config.sequelize.dialect,
    pool: {
        max: 5,
        min: 0,
        require: 30000,
        idle: 10000
    },
    define: {
        timestamps: true,
        freezeTableName: true
    },
    logging: false
}
);

sequelize.sync({ force: false }); // sync all tables

for (let table in sequelize.models) {
    const model = sequelize.model(table);
    if (model.asociate != undefined) {
        model.asociate();
    }
}

module.exports  = { sequelize };

