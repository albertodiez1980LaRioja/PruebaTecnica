const Sequelize = require("sequelize");
const { sequelize } = require("../../../shared/database/database.js"); 

const Candidate = sequelize.define('candidates', {
    surName: { type: Sequelize.TEXT, primaryKey: true,  },
    name: { type: Sequelize.TEXT, primaryKey: true,  },
    seniority: { type: Sequelize.TEXT, allowNull: false, },
    yearsExperience: { type: Sequelize.INTEGER, allowNull: false, },
    availability: { type: Sequelize.BOOLEAN, allowNull: false, },

}, {
    timestamps: false
});

//Candidate.asociate = function () {
//}

exports.Candidate = Candidate;  