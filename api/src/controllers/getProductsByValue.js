const { Sequelize, Op } = require("sequelize");
const { Product, Grape, Type, Region, State } = require("../db");

const getProductsByValue = async function (filter, value) {
    console.log(filter, value)
    if (!value || !filter) {
        throw new Error('You must enter an value')
    }
    if (filter === "Grape") {
        if (value === "all") {
            let AllProduct = await Product.findAll({
                include: [
                    {
                        model: Grape,
                    }
                ]
            })
            return AllProduct
        } else {
            let findProduct = await Product.findAll({
                include: [
                    {
                        model: Grape,
                        where: { name: value }
                    }
                ]
            })
            if (findProduct) {
                return findProduct;
            } else {
                throw new Error(`The product ${value} does not exist in the database`)
            }
        }

    }
    if (filter === "Type") {
        if (value === "all") {
            let AllProduct = await Product.findAll({
                include: [
                    {
                        model: Type,
                    }
                ]
            })
            return AllProduct
        } else {
            let findProduct = await Product.findAll({
                include: [
                    {
                        model: Type,
                        where: { name: value }
                    }
                ]
            })
            if (findProduct) {
                return findProduct;
            } else {
                throw new Error(`The product ${value} does not exist in the database`)
            }
        }
    }
    if (filter === "State") {
        if (value === "all") {
            let AllProduct = await Product.findAll({
                include: [
                    {
                        model: Type,
                    }
                ]
            })
            return AllProduct
        } else {
            let findProduct = await Product.findAll({
                include: [
                    {
                        model: State,
                        where: { name: value }
                    }
                ]
            });
            if (findProduct) {
                return findProduct;
            } else {
                throw new Error(`The product ${value} does not exist in the database`)
            }
        }
    }
    if (filter === "Region") {
        if (value === "all") {
            let AllProduct = await Product.findAll({
                include: [
                    {
                        model: Type,
                    }
                ]
            })
            return AllProduct
        } else {
            let findProduct = await Product.findAll({
                include: [
                    {
                        model: Region,
                        where: { name: value }
                    }
                ]
            });
            if (findProduct) {
                return findProduct;
            } else {
                throw new Error(`The product ${value} does not exist in the database`)
            }
        }
    }

    else {
        throw new Error(`The table ${table} does not exist in the database`)
    }
}

module.exports = { getProductsByValue };