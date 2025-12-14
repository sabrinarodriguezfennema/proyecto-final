import * as service from "../services/products.service.js";

export const getAllProducts = async (req, res, next) => {
  try {
    res.json(await service.getAllProducts());
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.getProductById(id);

    if (!product) {
      return res.status(404).json({ error: "Not Found" });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    if (!req.body.name) {
      return res.status(422).json({ error: "El nombre es obligatorio" });
    }

    const { name, price, categories } = req.body;
    const product = await service.createProduct({ name, price, categories });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await service.updateProduct(id, req.body);

    if (!updated) {
      return res.status(404).json({ error: "Not Found" });
    }

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await service.deleteProduct(id);

    if (!deleted) {
      return res.status(404).json({ error: "Not Found" });
    }

    res.json({ message: "Product deleted" });
  } catch (error) {
    next(error);
  }
};