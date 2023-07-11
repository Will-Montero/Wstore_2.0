import express from 'express';

import {
    getCustomers,
    getCustomerById,
    getCustomerByName,
    postCustomer,
    putCustomer,
    deleteCustomer
  } from '../services/customers.service'; 

  const router = express.Router();

  interface CustomErrorFormat {
    code: number,
    message: string,
    errorMessage: unknown
  }

router.get('', async (req, res) => {
    try{
        const serviceLayerResponse = await getCustomers();
        res.status(serviceLayerResponse.code).json({ result: serviceLayerResponse.result})
    }catch(error){
        const customError = error as CustomErrorFormat;
        console.log(customError.errorMessage);
        res.status(customError.code).json(customError.message);
  }
});


router.get('/id/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const serviceLayerResponse = await getCustomerById(id);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    }catch(error){
        const customError = error as CustomErrorFormat;
        console.log(customError.errorMessage);
        res.status(customError.code).json(customError.message)
    }
});

router.get('name/:name', async (req, res) => {
    try{
        const name = req.params.name;
        const serviceLayerResponse = await getCustomerByName(name);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
}catch(error){
    const customError = error as CustomErrorFormat;
    console.log(customError.errorMessage);
    res.status(customError.code).json(customError.message);
}
});

router.post('', async function (req, res){
    try{
        const body = req.body;
        const serviceLayerResponse = await postCustomer(body);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    }catch(error){
        const customError = error as CustomErrorFormat;
        console.log(customError.errorMessage);
        res.status(customError.code).json(customError.message);
    }
});

router.put('/:id', async function (req, res){
    try{
        const id = req.params.id;
        const body = req.body;
        const serviceLayerResponse = await putCustomer(id, body);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    }catch(error){
        const customError = error as CustomErrorFormat;
        console.log(customError.errorMessage);
        res.status(customError.code).json(customError.message);
    }
});

router.delete('/:id', async function (req, res) {
    try{
        const id = req.params.id;
        const serviceLayerResponse = await deleteCustomer(id);
        
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    }catch(error){
        const customError = error as CustomErrorFormat;
        console.log(customError.errorMessage);
        res.status(customError.code).json(customError.message);
    }
})
export default router;