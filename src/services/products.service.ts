import { Product } from '../types/products.types';
import {
    readProducts,
    readProductsById,
    readProductsByName,
    createProduct,
    updateProducts,
    deleteProductsById
  } from '../data/products.data';



interface serviceLayerResponse {
    code: number,
    result?: Product | Product [],
    message?: string,
    errorMessage?: unknown,
};
  
const getProducts = ():
Promise<serviceLayerResponse> => {
    return new Promise((resolve, reject) => {
        readProducts()

    .then((dataLayerResponse: Product[]) => {
        const localProductDB = dataLayerResponse;

        resolve({ code: 200, result: localProductDB});
    })
    .catch((error => {
        reject({code: 500, message: "error inesperado",
    errorMessage: error});
    }));
    });
};

const getProductsById = (id: string):Promise<serviceLayerResponse> => {
    return new Promise((resolve, reject) => {
        readProductsById(id)
        .then((dataLayerResponse) =>{ if((dataLayerResponse  as Product[]).length === 0){
            resolve({
                code: 404 , message: "producto no existe" })
        }else {
            resolve({ code: 200, result: dataLayerResponse as Product});
        }
    })
    .catch(error => {
        reject({ code : 500, message: "error inesperdado", errorMessage: error});

    });
});
};

const getProductsByName = (name: string): Promise<serviceLayerResponse> => {
    return new Promise((resolve, reject) => {
        readProductsByName(name)
        .then((dataLayerResponse) => { 
            if((dataLayerResponse as Product[]).length === 0){
                resolve({code: 404, message: "cliente no existe"});
            }else{
                resolve({ code: 200, result: dataLayerResponse as Product})
            }
         })
         .catch(error => { reject({code: 500, message: "error inesperado", errorMessage: error});
        });
    });
};

const  postProduct = (body: Product):Promise<serviceLayerResponse> => {
    return new Promise((resolve, reject) => 
    {
        createProduct(body)
        .then((dataLayerResponse) => {
            resolve({code: 201, message: dataLayerResponse as string});
        })
        .catch(error => {
            reject({ code: 500, message: "error unesperado", errorMessage: error})
        })
    })
}

const putProducts = (id: string, body: Product): Promise<serviceLayerResponse> => {
    return new Promise((resolve, reject) => {
        updateProducts(id, body)
        .then((dataLayerResponse) =>{
            if(dataLayerResponse === 200)
            (resolve({code: 200, message: "producto actualizado exitosamente" as string})
        );
        })
        .catch(error => {
            if(error === 404){
                reject({ code: 404, message:  "producto  no encontrado"});
            }else{
                reject({code: 500, message: "error inesperado", errorMessage: error});
            }
        });
    });
};

const deleteProducts = (id: string): Promise<serviceLayerResponse> => {
    return new Promise ((resolve, reject) => {
        deleteProductsById(id)
        .then((dataLayerResponse) => {
            if(dataLayerResponse === 200){
                resolve({code: 200, message: "producto borrado"});
            }
        })
        .catch((error) => {
            if(error === 404){
                reject({code: 404, message: 'producto no existe'})
            }else{
                reject({ code:500, message: 'error inesperado',
            errorMessage: error});
            }

        });
    });
};

export {
    getProducts,
    getProductsById,
    getProductsByName,
    postProduct,
    putProducts,
    deleteProducts
}