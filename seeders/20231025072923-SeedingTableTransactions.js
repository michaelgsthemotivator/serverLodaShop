"use strict";
const fs = require("fs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = JSON.parse(
      fs.readFileSync("./data/transaction.json", "utf-8")
    ).map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });

    await queryInterface.bulkInsert("Transactions", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Transactions", null);
  },
};
