import { db } from "../config/firebase.js";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  serverTimestamp
} from "firebase/firestore";

const COLLECTION_NAME = "products";

class ProductModel {

  // Obtener todos los productos
  async getAllProducts() {
    try {
      const productsRef = collection(db, COLLECTION_NAME);
      const snapshot = await getDocs(productsRef);

      return snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
    } catch (error) {
      throw new Error("Error al obtener productos");
    }
  }

  // Obtener producto por ID
  async getProductById(id) {
    try {
      const productRef = doc(db, COLLECTION_NAME, id);
      const snapshot = await getDoc(productRef);

      if (!snapshot.exists()) {
        return null;
      }

      return {
        id: snapshot.id,
        ...snapshot.data()
      };
    } catch (error) {
      throw new Error("Error al obtener producto");
    }
  }

  // Actualizar producto
  async updateProduct(id, data) {
    try {
      const productRef = doc(db, "products", id);
      const snapshot = await getDoc(productRef);

      if (!snapshot.exists()) {
        return null; // producto no existe
      }

      await updateDoc(productRef, data);

      return {
        id,
        ...data
      };
    } catch (error) {
      throw new Error("Error al actualizar producto");
    }
  }


  // Crear producto
  async createProduct(productData) {
    try {
      const productsRef = collection(db, COLLECTION_NAME);

      const newProduct = {
        ...productData,
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(productsRef, newProduct);

      return {
        id: docRef.id,
        ...productData
      };
    } catch (error) {
      throw new Error("Error al crear producto");
    }
  }

  // Eliminar producto
  async deleteProduct(id) {
    try {
      const productRef = doc(db, COLLECTION_NAME, id);
      const snapshot = await getDoc(productRef);

      if (!snapshot.exists()) {
        return null;
      }

      await deleteDoc(productRef);

      return { id };
    } catch (error) {
      throw new Error("Error al eliminar producto");
    }
  }
}

export default new ProductModel();
