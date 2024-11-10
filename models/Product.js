const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  sap: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  days: {
    lunes: { type: Number, default: 0 },
    martes: { type: Number, default: 0 },
    miercoles: { type: Number, default: 0 },
    jueves: { type: Number, default: 0 },
    viernes: { type: Number, default: 0 },
    sabado: { type: Number, default: 0 },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    required: true, 
  },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
