import ProductModel from './product.model.js';
import ProductRepository from './product.repository.js';

export default class ProductController {

  constructor(){
    this.productRepository = new ProductRepository();
  }

  async getAllProducts(req, res) {
    try{
      const products = ProductModel.getAll();
      res.status(200).send(products);
    }catch(err){
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
    
  }

  async addProduct(req, res) {
    try {
      const {
        name,
        price,
        sizes
      } = req.body;
      const newProduct = new ProductModel(name, parseFloat(price),sizes.split(','),req.file.filename
    );
      const createdRecord = ProductModel.add(
        newProduct
      );
      res.status(201).send(createdRecord);
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }

  }

  rateProduct(req, res) {
    const userID = req.userID;
    const productID = req.body.productID;
    const rating = req.body.rating;
    try {
      ProductModel.rateProduct(
        userID,
        productID,
        rating
      );
    } catch (err) {
      return res.status(400).send(err.message);
    }
    return res
      .status(200)
      .send('Rating has been added');
  }

  getOneProduct(req, res) {
    try{
      const id = req.params.id;
      const product = this.productRepository.get(id);
     if(!product){
      res.status(404).send('Product not found');
     } else{
      return res.status(200).send(product);
     }
    }catch(err){
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
    
  }

  async filterProducts(req, res) {
    try{
      const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const category = req.query.category;
    const result =  await this.productRepository.filter(
      minPrice,
      maxPrice,
      category
    );
    res.status(200).send(result); 
    }catch(err){
      console.log(err);
      return res.status(200).send("Something went wrong")
    }
    
   
  }
}