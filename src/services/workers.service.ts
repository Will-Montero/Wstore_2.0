import { Worker } from '../types/workers.types';
import {
    readWorkers,
    readWorkersById,
    readWorkerByName,
    createWorker,
    updateWorker,
    deleteWorkerById
  } from '../data/workers.data';


interface serviceLayerResponse {
    code: number,
    result?: Worker | Worker [],
    message?: string,
    errorMessage?: unknown,
};
  
const getWorkers = ():
Promise<serviceLayerResponse> => {
    return new Promise((resolve, reject) => {
        readWorkers()

    .then((dataLayerResponse: Worker[]) => {
        const localWorkersDB = dataLayerResponse;

        resolve({ code: 200, result: localWorkersDB});
    })
    .catch((error  => {
        reject({code: 500, message: "error inesperado",
    errorMessage: error});
    }));
    });
};

const getWorkerById = (id: string):Promise<serviceLayerResponse> => {
    return new Promise((resolve, reject) => {
        readWorkersById(id)
        .then((dataLayerResponse) =>{ if((dataLayerResponse  as Worker[]).length === 0){
            resolve({
                code: 404 , message: "trabajador no existe" })
        }else {
            resolve({ code: 200, result: dataLayerResponse as Worker});
        }
    })
    .catch(error => {
        reject({ code : 500, message: "error inesperdado", errorMessage: error});

    });
});
};

const getWorkerByName = (name: string): Promise<serviceLayerResponse> => {
    return new Promise((resolve, reject) => {
        readWorkerByName(name)
        .then((dataLayerResponse) => { 
            if((dataLayerResponse as Worker[]).length === 0){
                resolve({code: 404, message: "trabajador no existe"});
            }else{
                resolve({ code: 200, result: dataLayerResponse as Worker})
            }
         })
         .catch(error => { reject({code: 500, message: "error inesperado", errorMessage: error});
        });
    });
};

const postWorker = (body: Worker): Promise<serviceLayerResponse> => {
    return new Promise((resolve, reject) => { 
        createWorker(body)
        .then((dataLayerResponse) => {
            resolve({code: 201, message: dataLayerResponse as string});
        })
        .catch(error => {
            reject({ code: 500, message: "error inesperado", errorMessage: error});
        });
    });
}

const putWorker = (id: string, body: Worker): Promise<serviceLayerResponse> => {
    return new Promise((resolve, reject) => {
        updateWorker(id, body)
        .then((dataLayerResponse) =>{
            if(dataLayerResponse === 200)
            (resolve({code: 200, message: "trabajador actualizado exitosamente" as string})
        );
        })
        .catch(error => {
            if(error === 404){
                reject({ code: 404, message:  "trabajador no encontrado"});
            }else{
                reject({code: 500, message: "error inesperado", errorMessage: error});
            }
        });
    });
};

const deleteWorker = (id: string): Promise<serviceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        deleteWorkerById(id)
        .then((dataLayerResponse) => {
            if(dataLayerResponse === 200){
                resolve({code: 200, message: "trabajador borrado"});
            }
        })
        .catch((error) => {
            if(error === 404){
                reject({code: 404, message: 'trabajador no existe'})
            }else{
                reject({ code:500, message: 'error inesperado',
            errorMessage: error});
            }

        });
    });
};

export {
    getWorkers,
    getWorkerById,
    getWorkerByName,
    postWorker,
    putWorker,
    deleteWorker
  };