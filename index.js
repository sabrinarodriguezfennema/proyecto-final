import "dotenv/config";
import express from "express";
import cors from "cors";

import productsRouter from "./src/routes/products.routes.js";
import authRouter from "./src/routes/auth.routes.js";

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas de productos

app.use("/api/products", productsRouter);

// Rutas de auth
app.use("/api", authRouter);

// Ruta raíz
app.get("/", (req, res) => {
  res.send("API funcionando. Usa /api/products para ver productos.");
});

// Middleware 404
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error("Error:", err);
  const status = err.status || 500;
  const message = err.message || "Error interno del servidor";
  res.status(status).json({ error: message, status });
});

// Servidor
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));