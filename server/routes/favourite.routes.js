const express = require("express");
const favourite = require("../models/Favourite");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
    const { userId } = req.query;
    try {
        const list = await favourite.find({ userId: userId });
        res.send(list);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});
router.post("/", async (req, res) => {
    try {
        const newfavourite = await favourite.create({
            ...req.body
        });
        res.send(newfavourite);
    } catch (e) {
        res.status(400).json({ status: 400, message: e.message });
    }
});
router.delete("/", auth, async (req, res) => {
    try {
        const { id } = req.query;
        await favourite.deleteOne({ _id: id });
        return res.send("ok");
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});
module.exports = router;
