"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const { getProduct, getSingleProduct, createProduct, updateProducts, deleteProduct } = require("./controller/productController");
/*
implement your server code here
*/
const server = http_1.default.createServer((req, res) => {
    let change = req.url;
    if (change === "/api/products" && req.method === "GET") {
        getProduct(req, res);
    }
    else if (change.match(/\api\/products\/([0-9]+)/) && req.method === "GET") {
        const id = +change.split('/').slice(-1)[0];
        getSingleProduct(req, res, id);
    }
    else if (change === "/api/products" && req.method === "POST") {
        createProduct(req, res);
    }
    else if (
    // PUT request to update
    change.match(/\/api\/products\/([0-9]+)/) &&
        req.method === "PATCH") {
        const id = +change.split("/").slice(-1)[0];
        updateProducts(req, res, id);
    }
    else if (
    // delete request to Delete
    change.match(/\/api\/products\/([0-9]+)/) &&
        req.method === "DELETE") {
        const id = +change.split("/").slice(-1)[0];
        deleteProduct(req, res, id);
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});
server.listen(3005, () => {
    console.log("Running on port 3005");
});
