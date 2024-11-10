const express = require('express');
const authenticateToken = require('../middlewares/auth');
const Product = require('../models/Product');

const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
  const { sap, name, days } = req.body;
  
  try {
    const product = await Product.create({
      sap, 
      name, 
      days,
      userId: req.user._id  
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});

router.get("/", authenticateToken, async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});

router.put("/:sap", authenticateToken, async (req, res) => {
  const { sap } = req.params;
  const { days } = req.body;

  try {
    const product = await Product.findOne({ sap, userId: req.user._id });
    if (!product) {
      return res.status(404).send("Producto no encontrado o no pertenece al usuario");
    }

    product.days = days;
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
});

module.exports = router;
