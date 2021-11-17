import { writeTodatase } from "../utils"
interface obj {
    [keys: string]: string | string[]
}
type identity = {
    [keys: string]: number
}
let products = require("../../data/products")
/// Get Request 
export function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products)
    })
}
function generateid() {
    let id;
    if (products.length === 0) {
        id = 1
    } else {
        id = +(products[products.length - 1].id) + 1
    }
    return id
}
export function findByid(id: number) {
    return new Promise((resolve, reject) => {
        const product = products.find((elem: identity) => elem.id === id)
        resolve(product)
    })
}
// Post request
export function create(item: obj[]) {
    return new Promise((resolve, reject) => {
        const newitems = { id: generateid(), ...item }
        products.push(newitems)
        writeTodatase('./data/products.json', products)
        resolve(newitems)
    })
}
export function update(id: number, product: obj) {
    return new Promise((resolve, reject) => {
        const i = products.findIndex((x: identity) => x.id === id)
        products[i] = { id, ...product } as any
        writeTodatase('./data/product.json', products)
        resolve(products[i])
    })
}
export function removedelete(id: number) {
    return new Promise((resolve, reject) => {
        products = products.filter((p: any) => p.id !== id)
        writeTodatase("./data/Products.json", products);
        resolve(null);
    })
}