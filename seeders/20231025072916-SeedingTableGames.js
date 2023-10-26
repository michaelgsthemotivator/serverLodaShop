"use strict";
const fs = require("fs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync("./data/game.json", "utf-8")).map(
      (el) => {
        el.createdAt = el.updatedAt = new Date();
        return el;
      }
    );

    await queryInterface.bulkInsert("Games", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Games", null);
  },
};
