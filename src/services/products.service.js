import productModel from "../models/product.js";

export const getAllProducts = () => productModel.getAllProducts();

export const getProductById = (id) => productModel.getProductById(id);

export const createProduct = (data) => productModel.createProduct(data);

export const updateProduct = (id, data) => productModel.updateProduct(id, data);

export const deleteProduct = (id) => productModel.deleteProduct(id);