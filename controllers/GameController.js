const { Game } = require("../models/");

class Controller {
  static async getGameWithPaginationAndFilter(req, res, next) {
    try {
      const page = req.query.page || 1;
      const limit = 5;
      const offset = (page - 1) * limit;
      const { name } = req.query;
      const where = {};
      if (name) {
        where.name = { [Op.like]: `%${name}%` };
      }

      const games = await Game.findAll({
        include: [
          {
            model: User,
          },
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
}

module.exports = Controller;
