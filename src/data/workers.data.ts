import { Worker } from '../types/workers.types';

import { WorkerSchema } from '../schemas/workers.schemas';

const  readWorkers = (): Promise<Worker[]> => {
    return new Promise(async (resolve, reject) => {
        try{
            const mongoResponse = await WorkerSchema.find();
            resolve(mongoResponse);
        }catch(error){
            reject(error);
        }
    });
};


const readWorkersById = ( id: string) => {
    return new Promise(async(resolve, reject) => {
        try {
            const mongoResponse = await WorkerSchema.findById(id);
            if(mongoResponse === null){
                reject(404);
            }else{
                resolve(mongoResponse);

            }
        }catch(error){
            reject(error);
        }
    });
};
 const readWorkerByName = (name: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const mongoResult = await WorkerSchema.findOne({name: name});
            if(mongoResult === null){
            reject(404);
        }else{
        resolve(mongoResult);
        }
        }catch(error){
            reject(error);

        }
    });
};

const createWorker = (body: Worker) => {
    return new Promise(async(resolve, reject) => {
        try{
            const customer = new WorkerSchema(body);
            await customer.save();
            resolve('se ha agregado cliente')

        }catch (error) {
            reject(error);
        }
    });
};

const updateWorker = (id: string, body: Worker) => {
    return new Promise ( async(resolve, reject) => {
        try {
            const updateEntity = await WorkerSchema.findByIdAndUpdate(id, body, { new: true});
            if(updateEntity === null){
                reject(404);
            }else{
                resolve(200);
            }
        } catch(error){
            reject(error);
        }
    });
};

const deleteWorkerById = (id: string) => {
    return new Promise(async (resolve, reject) => {
        try{
            const deleteEntry = await WorkerSchema.findByIdAndRemove(id);
            if(deleteEntry === null){
                reject(404);
            }else{
                resolve(200);
            }
        }catch(error){
            reject(error);
        }
    });
};



export { 
    readWorkers,
    readWorkersById,
    readWorkerByName,
    createWorker,
    updateWorker,
    deleteWorkerById
  }; 