const express = require("express");
const auth = require("../middleware/loginMiddleware");
const z = require("zod");
const mongoose = require("mongoose");
const account = require("../db/database");

const accountRouter = express.Router();

// z validation schema
const transferSchema = z.object({
  to: z.string(),
  amount: z.string(),
});

accountRouter.get("/balance", auth, async (req, res) => {
  try {
    const userAccount = await account.findOne({
      userID: req.userID,
    });
    return res.status(200).json({ balance: userAccount.balance });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch balance" });
  }
});

accountRouter.post("/transfer", auth, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Validate the request body
    const valid = transferSchema.safeParse(req.body);
    if (!valid.success) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid request" });
    }

    const { to, amount } = valid.data;
    const numAmount = parseInt(amount);

    // Find the recipient account
    const recipientAccount = await account.findOne({ userID: to });
    if (!recipientAccount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Recipient account not found" });
    }

    // Find the sender's account and check balance
    const senderAccount = await account.findOne({ userID: req.userID });
    if (!senderAccount || senderAccount.balance < numAmount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Update the sender's account balance
    await account
      .updateOne(
        { userID: req.userID },
        { $inc: { balance: -numAmount } }
      )
      .session(session);

    // Update the recipient's account balance
    await account
      .updateOne(
        { userID: to },
        { $inc: { balance: numAmount } }
      )
      .session(session);

    // Commit the transaction
    await session.commitTransaction();
    return res.json({ message: "Transfer successful" });

  } catch (err) {
    await session.abortTransaction();
    return res.status(500).json({ error: "Transaction failed" });
  } finally {
    session.endSession();
  }
});

module.exports = accountRouter;
