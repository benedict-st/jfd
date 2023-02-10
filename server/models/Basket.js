const { Schema, model } = require("mongoose");
const schema = new Schema(
    {
        kolvo: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        picture: {
            type: String
        },
        productId: { type: Schema.Types.ObjectId, ref: "Products" },
        summa: {
            type: Number
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    { timestamps: true }
);

module.exports = model("Basket", schema);
