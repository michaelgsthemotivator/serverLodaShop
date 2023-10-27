const { Game, Transaction } = require("../models/");
const { Op } = require("sequelize");

class Controller {
  static async getGameWithPaginationAndFilter(req, res, next) {
    try {
      const page = req.query.page || 1;
      const limit = 5;
      const offset = (page - 1) * limit;
      const { filter } = req.query;
      const where = {};
      if (filter) {
        where.name = { [Op.iLike]: `%${filter}%` };
      }

      const games = await Game.findAll({
        include: [
          {
            model: Transaction,
          },
        ],
        where,
        offset,
        limit,
        order: [["id", "ASC"]],
      });
      res.status(200).json(games);
    } catch (error) {
      next(error);
    }
  }
  static async getGameById(req, res, next) {
    try {
      const { id } = req.params;
      const gameById = await Game.findByPk(id, {
        include: [Transaction],
      });

      if (gameById) {
        res.status(200).json(gameById);
      } else {
        throw { name: "not found" };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
