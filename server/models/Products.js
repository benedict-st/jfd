const { Schema, model, ObjectId } = require("mongoose");
const schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        fullname: {
            type: String
        },
        category: { type: Schema.Types.ObjectId, ref: "Categories" },

        price: {
            type: Number
        },
        sale: {
            type: String
        },
        shelfLife: {
            type: String
        },
        weight: {
            type: String
        },
        picture: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = model("Products", schema);
