const { History } = require("../models/");
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
      const histories = await History.create({
        description: `Thanks For Your Top Up on Transaction (transactionname) on Game (gamename), for (price)`,
        TransactionId: getTransactionId.id,
        UserId: req.user.id,
      });
      res.status(200).json(histories);
    } catch (error) {
      next(error);
    }
  }
  static async generateMidtransToken(req, res, next) {
    try {
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });
      let parameter = {
        transaction_details: {
          order_id: `TRANSACTION_${Math.floor(
            1000000 + Math.random() * 900000
          )}`,
          gross_amount: 10000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: "budi",
          last_name: "pratama",
          email: "budi.pra@example.com",
          phone: "08111222333",
        },
      };
      snap.createTransaction(parameter).then((transaction) => {
        // transaction token
        let transactionToken = transaction.token;
        console.log("transactionToken:", transactionToken);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = HistoryController;
