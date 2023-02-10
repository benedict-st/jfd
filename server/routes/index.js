const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/basket", require("./basket.routes"));
router.use("/categories", require("./categories.routes"));
router.use("/comment", require("./comment.routes"));
router.use("/favourite", require("./favourite.routes"));
router.use("/orders", require("./orders.routes"));
router.use("/products", require("./products.routes"));
router.use("/user", require("./user.routes"));
module.exports = router;
