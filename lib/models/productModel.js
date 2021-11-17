"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removedelete = exports.update = exports.create = exports.findByid = exports.findAll = void 0;
const utils_1 = require("../utils");
let products = require("../../data/products");
/// Get Request 
function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products);
    });
}
exports.findAll = findAll;
function generateid() {
    let id;
    if (products.length === 0) {
        id = 1;
    }
    else {
        id = +(products[products.length - 1].id) + 1;
    }
    return id;
}
function findByid(id) {
    return new Promise((resolve, reject) => {
        const product = products.find((elem) => elem.id === id);
        resolve(product);
    });
}
exports.findByid = findByid;
// Post request
function create(item) {
    return new Promise((resolve, reject) => {
        const newitems = { id: generateid(), ...item };
        products.push(newitems);
        (0, utils_1.writeTodatase)('./data/products.json', products);
        resolve(newitems);
    });
}
exports.create = create;
function update(id, product) {
    return new Promise((resolve, reject) => {
        const i = products.findIndex((x) => x.id === id);
        products[i] = { id, ...product };
        (0, utils_1.writeTodatase)('./data/product.json', products);
        resolve(products[i]);
    });
}
exports.update = update;
function removedelete(id) {
    return new Promise((resolve, reject) => {
        products = products.filter((p) => p.id !== id);
        (0, utils_1.writeTodatase)("./data/Products.json", products);
        resolve(null);
    });
}
exports.removedelete = removedelete;
