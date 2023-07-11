import express from 'express';

import {
    getProducts,
    getProductsById,
    getProductsByName,
    postProduct,
    putProducts,
    deleteProducts
  } from '../services/products.service'; 

  const router = express.Router();

  interface ProductErrorFormat {
    code: number,
    message: string,
    errorMessage: unknown
  }

router.get('', async (req, res) => {
    try{
        const serviceLayerResponse = await getProducts();
        res.status(serviceLayerResponse.code).json({ result: serviceLayerResponse.result})
    }catch(error){
        const productError = error as ProductErrorFormat;
        console.log(productError.errorMessage);
        res.status(productError.code).json(productError.message);
  }
});


router.get('/id/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const serviceLayerResponse = await getProductsById(id);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    }catch(error){
        const ProductsError = error as ProductErrorFormat;
        console.log(ProductsError.errorMessage);
        res.status(ProductsError.code).json(ProductsError.message)
    }
});

router.get('name/:name', async (req, res) => {
    try{
        const name = req.params.name;
        const serviceLayerResponse = await getProductsByName(name);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
}catch(error){
    const ProductsError = error as ProductErrorFormat;
    console.log(ProductsError.errorMessage);
    res.status(ProductsError.code).json(ProductsError.message);
}
});

router.post('', async function (req, res){
    try{
        const body = req.body;
        const serviceLayerResponse = await postProduct(body);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    }catch(error){
        const ProductsError = error as ProductErrorFormat;
        console.log(ProductsError.errorMessage);
        res.status(ProductsError.code).json(ProductsError.message);
    }
});

router.put('/:id', async function (req, res){
    try{
        const id = req.params.id;
        const body = req.body;
        const serviceLayerResponse = await putProducts(id, body);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    }catch(error){
        const ProductsError = error as ProductErrorFormat;
        console.log(ProductsError.errorMessage);
        res.status(ProductsError.code).json(ProductsError.message);
    }
});

router.delete('/:id', async function (req, res) {
    try{
        const id = req.params.id;
        const serviceLayerResponse = await deleteProducts(id);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    }catch(error){
        const ProductsError = error as ProductErrorFormat;
        console.log(ProductsError.errorMessage);
        res.status(ProductsError.code).json(ProductsError.message);
    }
})
export default router;