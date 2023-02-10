const express = require("express");
const Basket = require("../models/Basket");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });
router.get("/", auth, async (req, res) => {
    const { userId } = req.query;
    try {
        const list = await Basket.find({ userId: userId });
        res.send(list);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});
router.post("/", async (req, res) => {
    try {
        const newBasket = await Basket.create({
            ...req.body
        });
        res.send(newBasket);
    } catch (e) {
        res.status(400).json({ status: 400, message: e.message });
    }
});
router.delete("/", auth, async (req, res) => {
    try {
        const { productId } = req.query;
        await Basket.deleteMany({ productId: productId });
        return res.send("ok");
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});
module.exports = router;
