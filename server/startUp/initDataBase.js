const Categories = require("../models/Categories");
const categoriesMock = require("../mock/categorys.json");
const productsMock = require("../mock/products.json");
const models = require("../models");
const chalk = require("chalk");
module.exports = async () => {
    setInitialData();
};

const findCategories = (categoriesId, categories) => {
    const category = categoriesMock.find((el) => el._id === categoriesId);
    return categories.find((cat) => cat.name === category.name)._id;
};

const createInitialEntity = (data, model) => {
    return Promise.all(
        data.map(async ({ _id, ...exampleData }) => {
            try {
                const exm = await model.find({
                    name: exampleData.name
                });
                if (exm.length !== 0) {
                    return exm[0];
                }
                const newExm = new model(exampleData);
                await newExm.save();
                return newExm;
            } catch (error) {
                throw new Error(error);
            }
        })
    );
};
async function setInitialData() {
    const categoriesData = await createInitialEntity(
        categoriesMock,
        Categories
    );
    console.log(chalk.green("✓"));
    const products = await Promise.all(
        productsMock.map(async ({ _id, ...productsData }) => {
            try {
                const product = await models.products.find({
                    name: productsData.name
                });
                if (product.length !== 0) {
                    return product[0];
                }
                productsData.category = findCategories(
                    productsData.category,
                    categoriesData
                );
                const newProduct = new models.products(productsData);
                await newProduct.save();
                return newProduct;
            } catch (error) {
                throw console.log(error);
            }
        })
    );
}
