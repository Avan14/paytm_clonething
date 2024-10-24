const express = require("express");
const userRouter = require("./userRoute");
const accountRouter = require("./account");

const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);

router.all("/*", (req, res) => {
    res.status(404).json({
        msg: "Invalid request"
    });
});

module.exports = router;
