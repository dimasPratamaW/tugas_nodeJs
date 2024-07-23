const express = require("express");
const router_product = express.Router();
const ProductModel = require("./ProductModel");
const { productDeto } = require("./productDeto");

const { Op } = require("sequelize");
const { NotFound } = require("http-errors");

router_product.post("/product", addProduct);
router_product.get("/product/:id", getProductDetail);
router_product.put("/product/:id", updateProduct);
router_product.delete("/product/:id", deleteProduct);
router_product.get("/product/allproduct/:id", getAllProduct);


async function addProduct(req, res, next) {
    try {
        const {
            product_name,
            product_picture,
            product_price,
            id_user,
        } = req.body;

        const product = await ProductModel.create({
            product_name: product_name,
            product_picture: product_picture,
            product_price: product_price,
            id_user: id_user,
        });
        const getProductDetail = await ProductModel.findOne({
            where: {
                product_id: { [Op.eq]: product.getDataValue("product_id") },
            },
            attributes: ["product_id", "product_name", "product_price"],
        });

        res.status(201).json(getProductDetail);
    } catch (error) {
        next(error);
    }
}

async function updateProduct(req, res, next) {
    try {
        const {
            product_name,
            product_picture,
            product_price,
            id_user
        } = req.body;

        const product_id = req.params.id;


        const order = await ProductModel.update(
            {
                product_name: product_name,
                product_picture: product_picture,
                product_price: product_price
            },
            {
                where: {
                    product_id: { [Op.eq]: product_id },
                },
            },
        );
        console.log(JSON.stringify(order));
        const getProductDetail = await ProductModel.findOne({
            where: {
                product_id: { [Op.eq]: product_id },
            },
            attributes: ["product_id", "product_name", "product_price"],
        });

        res.status(201).json(getProductDetail);
    } catch (error) {
        next(error);
    }
}

async function getProductDetail(req, res, next) {
    try {
        const product_id = req.params.id;
        console.log(product_id);
        const getProductDetail = await ProductModel.findOne({
            where: {
                product_id: { [Op.eq]: product_id },
            },
            attributes: [ "product_name", "product_price"],
        });
        console.log(JSON.stringify(getProductDetail));

        res.status(201).json(getProductDetail);
    } catch (error) {
        next(error);
    }
}

async function deleteProduct(req, res, next) {
    try {
        const product_id = req.params.id;
        console.log(product_id);
        const getProductDetail = await ProductModel.findOne({
            where: {
                product_id: { [Op.eq]: product_id },
            },
            attributes: ["product_id", "product_name", "product_price"],
        });
        console.log(JSON.stringify(getProductDetail));

        if (!getProductDetail) {
            throw new NotFound("order not found");
        }

        await ProductModel.destroy({
            where: {
                product_id: { [Op.eq]: product_id },
            },
        });

        res.status(204).json(true);
    } catch (error) {
        next(error);
    }
}

module.exports = router_product;
