import { Product } from '../types/products.types';

import { ProductSchema } from '../schemas/products.schemas';

const  readProducts = (): Promise<Product[]> => {
    return new Promise(async (resolve, reject) => {
        try{
            const mongoResponse = await ProductSchema.find();
            resolve( mongoResponse )
        }catch(error){
            reject(error);
        }
    });
};


const readProductsById = ( id: string) => {
    return new Promise(async(resolve, reject) => {
        try {
            const mongoResponse = await ProductSchema.findById(id);
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
 const readProductsByName = (name: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const mongoResult = await ProductSchema.findOne({name: name});
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

const createProduct = (body: Product) => {
    return new Promise(async(resolve, reject) => {
        try{
            const product = new ProductSchema(body);
            await product.save();
            resolve('se ha agregado Producto')

        }catch (error) {
            reject(error);
        }
    });
};

const updateProducts = (id: string, body: Product) => {
    return new Promise ( async(resolve, reject) => {
        try {
            const updateEntity = await ProductSchema.findByIdAndUpdate(id, body, { new: true});
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

const deleteProductsById = (id: string) => {
    return new Promise(async (resolve, reject) => {
        try{
            const deleteEntry = await ProductSchema.findByIdAndRemove(id);
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
    readProducts,
    readProductsById,
    readProductsByName,
    createProduct,
    updateProducts,
    deleteProductsById
  }; 