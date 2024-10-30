const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.post("/", async (req, res) => {
  const { sap, name, days } = req.body;

  try {
    const product = await Product.create({ sap, name, days });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});

router.put("/:sap", async (req, res) => {
  const { sap } = req.params;
  const { days } = req.body;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { sap },
      { days },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).send("Producto no encontrado");
    }
    res.send(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar el producto");
  }
});

module.exports = router;
