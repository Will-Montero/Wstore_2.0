import express from 'express';

import {
    getWorkers,
    getWorkerById,
    getWorkerByName,
    postWorker,
    putWorker,
    deleteWorker
} from '../services/workers.service';

const router = express.Router();

interface WorkErrorFormat {
    code: number,
    message: string,
    errorMessage: string
}

router.get('', async (req, res) => {
    try{
        const serviceLayerResponse = await getWorkers();
        res.status(serviceLayerResponse.code).json({result: serviceLayerResponse.result});
    }catch(error){
        const workError = error as WorkErrorFormat;
        console.log(workError.errorMessage);
        res.status(workError.code).json(workError.message);
    }
});

router.get('/id/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const serviceLayerResponse = await  getWorkerById(id);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message)
    }catch(error){
        const workError = error as WorkErrorFormat;
        console.log(workError.errorMessage);
        res.status(workError.code).json(workError.message)
    }
});

router.get('name/:name', async (req, res) => {
    try{
        const body = req.body;
        const serviceLayerResponse = await getWorkerByName(body);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message)
    }catch(error){
        const workError = error as WorkErrorFormat;
        console.log(workError.errorMessage);
        res.status(workError.code).json(workError.message)
    }
});

router.post('', async function (req, res)  {
    try{
        const body = req.body;
        const serviceLayerResponse = await postWorker(body);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message)
    }catch(error){
        const workError = error as WorkErrorFormat;
        console.log(workError.errorMessage);
        res.status(workError.code).json(workError.message)
    }
});

router.put('/:id', async function (req, res) {
    try{
        const id = req.params.id;
        const body = req.body;
        const serviceLayerResponse = await putWorker(id, body);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    }catch(error){
        const workError = error as WorkErrorFormat;
        console.log(workError.errorMessage);
        res.status(workError.code).json(workError.message);
    }
});

router.delete('/:id', async function(req, res){
    try{
        const id = req.params.id;
        const serviceLayerResponse = await deleteWorker(id);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message)
    }catch(error){
        const workError = error as WorkErrorFormat;
        console.log(workError.errorMessage);
        res.status(workError.code).json(workError.message)
        }
    });

export default router;

