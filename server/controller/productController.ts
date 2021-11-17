import http, { IncomingMessage, ServerResponse } from "http";
import { getData } from "../utils";
import { findAll, findByid, create,update,removedelete} from "../models/productModel";
interface Oj {
  [key: string]: string | number | { [key: string]: string };
}
export async function getProduct(req: IncomingMessage, res: ServerResponse) {
  try {
    const products = await findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    res.end("Could not get products from the dataase");
  }
}
export async function getSingleProduct(
  req: IncomingMessage,
  res: ServerResponse,
  id: number
) {
  try {
    const product = await findByid(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "product not found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
}
export async function createProduct(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = (await getData(req)) as string;
    const { productName, productDescription, productVarieties } =
      JSON.parse(body);
    const product: any = {
      productName,
      productDescription,
      productVarieties,
      dateUploaded: new Date().toISOString(),
      dateEdited: new Date().toISOString(),
    };
    const newproduct = await create(product);
    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newproduct));
  } catch (error) {
    console.log(error);
  }
}
export async function updateProducts(
  req: IncomingMessage,
  res: ServerResponse,
  id: number
) {
  try {
    const product: any = await findByid(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Organzation not found" }));
    } else {
      const body:any = await getData(req);
      const { productName, productDescription, productVarieties } =
        JSON.parse(body);
      const productData: any = {
        productName: productName || product.productName,
        productDescription: productDescription || product.productName,
        productVarieties: productVarieties || product.productVarieties,
        dateUploaded: product.dateUploaded,
        dateEdited: new Date().toISOString(),
      };
      const updProduct = await update(id, productData);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updProduct));
    }
  } catch (error) {
    console.log(error);
  }
}
export async function deleteProduct(
  req: IncomingMessage,
  res: ServerResponse,
  id: number
) {
  try {
    const product = await findByid(id);
    //check if the organization exist
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));
    } else {
      await removedelete(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Product ${id}​ removed` }));
    }
  } catch (error) {
    console.log(error);
  }
}