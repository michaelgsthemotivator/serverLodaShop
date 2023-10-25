"use strict";
const fs = require("fs");
const bcryptjs = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync("./data/user.json", "utf-8")).map(
      (el) => {
        const salt = bcryptjs.genSaltSync(8);
        const hash = bcryptjs.hashSync(el.password, salt);
        el.password = hash;
        el.createdAt = el.updatedAt = new Date();
        return el;
      }
    );

    await queryInterface.bulkInsert("Users", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null);
  },
};
