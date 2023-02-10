const { Schema, model } = require("mongoose");
const schema = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Products",
            required: true
        },
        favourite: {
            type: Boolean
        },
        fullname: {
            type: String
        },
        name: {
            type: String
        },
        picture: {
            type: String
        },
        price: {
            type: Number
        },
        userId: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = model("favourite", schema);
