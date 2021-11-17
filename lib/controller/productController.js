"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProducts = exports.createProduct = exports.getSingleProduct = exports.getProduct = void 0;
const utils_1 = require("../utils");
const productModel_1 = require("../models/productModel");
async function getProduct(req, res) {
    try {
        const products = await (0, productModel_1.findAll)();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(products));
    }
    catch (error) {
        res.end("Could not get products from the dataase");
    }
}
exports.getProduct = getProduct;
async function getSingleProduct(req, res, id) {
    try {
        const product = await (0, productModel_1.findByid)(id);
        if (!product) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "product not found" }));
        }
        else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(product));
        }
    }
    catch (error) {
        console.log(error);
    }
}
exports.getSingleProduct = getSingleProduct;
async function createProduct(req, res) {
    try {
        const body = (await (0, utils_1.getData)(req));
        const { productName, productDescription, productVarieties } = JSON.parse(body);
        const product = {
            productName,
            productDescription,
            productVarieties,
            dateUploaded: new Date().toISOString(),
            dateEdited: new Date().toISOString(),
        };
        const newproduct = await (0, productModel_1.create)(product);
        res.writeHead(201, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(newproduct));
    }
    catch (error) {
        console.log(error);
    }
}
exports.createProduct = createProduct;
async function updateProducts(req, res, id) {
    try {
        const product = await (0, productModel_1.findByid)(id);
        if (!product) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Organzation not found" }));
        }
        else {
            const body = await (0, utils_1.getData)(req);
            const { productName, productDescription, productVarieties } = JSON.parse(body);
            const productData = {
                productName: productName || product.productName,
                productDescription: productDescription || product.productName,
                productVarieties: productVarieties || product.productVarieties,
                dateUploaded: product.dateUploaded,
                dateEdited: new Date().toISOString(),
            };
            const updProduct = await (0, productModel_1.update)(id, productData);
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify(updProduct));
        }
    }
    catch (error) {
        console.log(error);
    }
}
exports.updateProducts = updateProducts;
async function deleteProduct(req, res, id) {
    try {
        const product = await (0, productModel_1.findByid)(id);
        //check if the organization exist
        if (!product) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Product not found" }));
        }
        else {
            await (0, productModel_1.removedelete)(id);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: `Product ${id}​ removed` }));
        }
    }
    catch (error) {
        console.log(error);
    }
}
exports.deleteProduct = deleteProduct;
