const { Game, Transaction, History } = require("../models/");
const axios = require("axios");

class Controller {
  static async postTransaction(req, res, next) {
    try {
      console.log(req.user);
      const { title, price, GameId } = req.body;

      const newTransaction = await Transaction.create({
        title,
        price,
        GameId,
      });
      const getTransactionId = await Transaction.findByPk(
        newTransaction.GameId,
        { include: [Game] }
      );

      await History.create({
        description: `New Transaction with id ${newTransaction.id} on Game ${getTransactionId.Game.name} is Created`,
        TransactionId: getTransactionId.id,
        UserId: req.user.id,
      });
      res.status(201).json(newTransaction);
    } catch (error) {
      next(error);
    }
  }

  static async getTransaction(req, res, next) {
    try {
      const transactions = await Transaction.findAll({
        include: [Game],
      });
      res.status(200).json(transactions);
    } catch (error) {
      next(error);
    }
  }

  static async getTransactionDetail(req, res, next) {
    try {
      const { id } = req.params;
      const transaction = await Transaction.findByPk(id, {
        include: [Game],
      });

      if (transaction) {
        res.status(200).json(transaction);
      } else {
        throw { name: "not found" };
      }
    } catch (error) {
      next(error);
    }
  }
  //a

  static async generateQrCode(req, res, next) {
    try {
      const { QR_CODE_API_KEY } = process.env;
      const { url } = req.body;
      const generatedQrCode = await axios({
        method: "post",
        url:
          "https://api.qr-code-generator.com/v1/create?access-token=" +
          QR_CODE_API_KEY,
        data: {
          frame_name: "no-frame",
          qr_code_text: url,
          image_format: "SVG",
          qr_code_logo: "scan-me-square",
        },
      });

      res.status(201).json({ qrcode: generatedQrCode.data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
