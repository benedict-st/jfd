const { Schema, model } = require("mongoose");
const schema = new Schema(
    {
        address: {
            type: String
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Categories"
        },
        deliveryType: {
            type: String
        },
        fio: {
            type: String
        },
        himselfAdress: {
            type: String
        },
        kolvo: {
            type: Number
        },
        idOrder: {
            type: String
        },
        moreInformation: {
            type: String
        },
        orderData: {
            type: Date
        },
        phone: {
            type: String
        },
        productName: {
            type: String
        },
        price: {
            type: String
        },
        himselfAdress: {
            type: String
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Products",
            required: true
        },
        userID: { type: Schema.Types.ObjectId, ref: "User", required: true }
    },
    { timestamps: true }
);

module.exports = model("Orders", schema);
