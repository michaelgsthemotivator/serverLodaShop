const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/TransactionController");
const GameController = require("../controllers/GameController");
const UserControlller = require("../controllers/UserController");
const HistoryController = require("../controllers/HistoryController");
const { authentication } = require("../middlewares/authentication");

// REGISTER AND LOGIN
router.post("/register", UserControlller.register);
router.post("/login", UserControlller.login);

// AUTHENTICATION
router.use(authentication);

router.get("/transactions", TransactionController.getTransaction);
router.post("/transactions", TransactionController.postTransaction);
router.get("/transactions/:id", TransactionController.getTransactionDetail);

router.get("/histories", HistoryController.getHistories);

// router.post("/qr-code", TransactionController.generateQrCode);

router.get("/games", GameController.getGameWithPaginationAndFilter);

module.exports = router;
