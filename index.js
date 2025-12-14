import "dotenv/config";
import express from "express";

import authRouter from "./src/routes/auth.routes.js";
import productsRouter from "./src/routes/products.router.js"; // rutas protegidas
import { authMiddleware } from "./src/middlewares/auth.middleware.js";
import notFound from "./src/middlewares/not-found.js";

const app = express();

// Middlewares globales
app.use(express.json());

// Ruta raíz
app.get("/", (req, res) => {
  res.json({ message: "Bienvenidos a nuestra API REST!" });
});

// Rutas de autenticación (públicas)
app.use("/api/auth", authRouter);

// Rutas de productos (protegidas con authMiddleware)
app.use("/api/products", authMiddleware, productsRouter);

// Middleware 404
app.use(notFound);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error("Error:", err);
  const status = err.status || 500;
  const message = err.message || "Error interno del servidor";
  res.status(status).json({ error: message, status });
});

// Servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));