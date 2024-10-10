/*import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const products = await prisma.products.findMany();

const app = express();

app.get("/", (req, res) => {
  res.json({ products });
});



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

*/


import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const products = await prisma.products.findMany();

const app = express();

// Añadir middleware para parsear JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ products });
});

// Nueva ruta para crear un producto
app.post("/products", async (req, res) => {
  const { name, price, image } = req.body;
  
  try {
    const newProduct = await prisma.products.create({
      data: {
        name,
        price,
        image
      }
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: "No se pudo crear el producto" });
  }
});

app.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { name, price, image } = req.body;
    
    try {
      const updatedProduct = await prisma.products.update({
        where: { id: parseInt(id) },
        data: {
          name,
          price,
          image
        }
      });
      res.json(updatedProduct);
    } catch (error) {
      res.status(404).json({ error: "Producto no encontrado o no se pudo actualizar" });
    }
  });



  app.delete("/deletes/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
      await prisma.products.delete({
        where: { id: parseInt(id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: "Producto no encontrado o no se pudo eliminar" });
    }
  });
  

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});