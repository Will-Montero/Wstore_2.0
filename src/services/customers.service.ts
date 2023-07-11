import { Customer } from '../types/customers.types';
import {
    readCustomers,
    readCustomersById,
    readCustomerByName,
    createCustomer,
    updateCustomer,
    deleteCustomerById
  } from '../data/customers.data';


interface serviceLayerResponse {
    code: number,
    result?: Customer | Customer [],
    message?: string,
    errorMessage?: unknown,
};
  
const getCustomers = ():
Promise<serviceLayerResponse> => {
    return new Promise((resolve, reject) => {
        readCustomers()

    .then((dataLayerResponse: Customer[]) => {
        const localCustomersDB = dataLayerResponse;

        resolve({ code: 200, result: localCustomersDB});
    })
    .catch((error => {
        reject({code: 500, message: "error inesperado",
    errorMessage: error});
    }));
    });
};

const getCustomerById = (id: string):Promise<serviceLayerResponse> => {
    return new Promise((resolve, reject) => {
        readCustomersById(id)
        .then((dataLayerResponse) =>{ if((dataLayerResponse  as Customer[]).length === 0){
            resolve({
                code: 404 , message: "cliente no existe" })
        }else {
            resolve({ code: 200, result: dataLayerResponse as Customer});
        }
    })
    .catch(error => {
        reject({ code : 500, message: "error inesperdado", errorMessage: error});

    });
});
};

const getCustomerByName = (name: string): Promise<serviceLayerResponse> => {
    return new Promise((resolve, reject) => {
        readCustomerByName(name)
        .then((dataLayerResponse) => { 
            if((dataLayerResponse as Customer[]).length === 0){
                resolve({code: 404, message: "cliente no existe"});
            }else{
                resolve({ code: 200, result: dataLayerResponse as Customer})
            }
         })
         .catch(error => { reject({code: 500, message: "error inesperado", errorMessage: error});
        });
    });
};

const postCustomer = (body: Customer): Promise<serviceLayerResponse> => {
    return new Promise((resolve, reject) => { 
        createCustomer(body)
        .then((dataLayerResponse) => {
            resolve({code: 201, message: dataLayerResponse as string});
        })
        .catch(error => {
            reject({ code: 500, message: "error inesperado", errorMessage: error});
        });
    });
}

const putCustomer = (id: string, body: Customer): Promise<serviceLayerResponse> => {
    return new Promise((resolve, reject) => {
        updateCustomer(id, body)
        .then((dataLayerResponse) =>{
            if(dataLayerResponse === 200)
            (resolve({code: 200, message: "cliente actualizado exitosamente" as string})
        );
        })
        .catch(error => {
            if(error === 404){
                reject({ code: 404, message:  "Cliente no encontrado"});
            }else{
                reject({code: 500, message: "error inesperado", errorMessage: error});
            }
        });
    });
};

const deleteCustomer = (id: string): Promise<serviceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        deleteCustomerById(id)
        .then((dataLayerResponse) => {
            if(dataLayerResponse === 200){
                resolve({code: 200, message: "cliente borrado"});
            }
        })
        .catch((error) => {
            if(error === 404){
                reject({code: 404, message: 'cliente no existe'})
            }else{
                reject({ code:500, message: 'error inesperado',
            errorMessage: error});
            }

        });
    });
};

export {
    getCustomers,
    getCustomerById,
    getCustomerByName,
    postCustomer,
    putCustomer,
    deleteCustomer
  };