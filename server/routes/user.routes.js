const express = require("express");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

router.patch("/:userId", auth, async (req, res) => {
    try {
        const { userId } = req.params;
        if (userId === req.user._id) {
            const updateUser = await User.findByIdAndUpdate(userId, req.body, {
                new: true
            });
            res.send(updateUser);
        } else {
            res.status(401).json({
                message: "Unautorized"
            });
        }
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const list = await User.find();
        res.send(list);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

router.post("/", auth, async (req, res) => {
    const userId = req.body.userId;
    try {
        const list = await User.findById(userId);
        res.send({
            _id: list._id,
            email: list.email,
            fio: list.fio,
            address: list.address,
            phone: list.phone
        });
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

module.exports = router;