const express = require("express");
const Orders = require("../models/Orders");
const auth = require("../middleware/auth.middleware");

const router = express.Router({ mergeParams: true });
router.get("/", auth, async (req, res) => {
    const { userId } = req.query;
    try {
        const list = await Orders.find({ userId: userId });
        res.send(list);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});
router.post("/", async (req, res) => {
    try {
        const newOrders = await Orders.create({
            ...req.body
        });
        res.send(newOrders);
    } catch (e) {
        res.status(400).json({ status: 400, message: e.message });
    }
});
router.delete("/", auth, async (req, res) => {
    try {
        const { ordersId } = req.query;
        await Orders.deleteOne({ _id: ordersId });
        return res.send("ok");
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});
module.exports = router;
