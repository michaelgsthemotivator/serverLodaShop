const { History, Transaction, Game } = require("../models/");
const midtransClient = require("midtrans-client");

class HistoryController {
  static async getHistories(req, res, next) {
    try {
      const histories = await History.findAll({
        order: [["id", "DESC"]],
      });

      res.status(200).json(histories);
    } catch (error) {
      next(error);
    }
  }
  static async postHistories(req, res, next) {
    try {
      const { id: transactionId } = req.params;
      console.log("halo");
      const transactionByPk = await Transaction.findByPk(transactionId, {
        include: [Game],
      });
      const histories = await History.create({
        description: `Thanks For Your Top Up on Transaction ${transactionByPk.title} on Game ${transactionByPk.Game.name}, for ${transactionByPk.price}`,
        UserId: req.user.id,
        TransactionId: transactionByPk.GameId,
      });
      res.status(200).json(histories);
    } catch (error) {
      next(error);
    }
  }
  static async generateMidtransToken(req, res, next) {
    try {
      const { id } = req.body;
      // console.log(req);

      const data = await Transaction.findByPk(id);
      // console.log(data, "hello");
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });
      let parameter = {
        transaction_details: {
          order_id: `TRANSACTION_${Math.floor(
            1000000 + Math.random() * 900000
          )}`,
          gross_amount: data.price,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          //ini optional
          // first_name: "budi",
          // last_name: "pratama",
          email: req.user.email,
          // phone: "08111222333",
        },
      };
      snap.createTransaction(parameter).then((transaction) => {
        // transaction token
        let transactionToken = transaction.token;
        console.log("transactionToken:", transactionToken);
        res.status(200).json({ transactionToken });
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = HistoryController;
