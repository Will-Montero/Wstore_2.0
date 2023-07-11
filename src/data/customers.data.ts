import { Customer } from '../types/customers.types';

import { CustomerSchema } from '../schemas/customers.schemas';

const  readCustomers = (): Promise<Customer[]> => {
    return new Promise(async (resolve, reject) => {
        try{
            const mongoResponse = await CustomerSchema.find();
            resolve(mongoResponse);
        }catch(error){
            reject(error);
        }
    });
};


const readCustomersById = ( id: string) => {
    return new Promise(async(resolve, reject) => {
        try {
            const mongoResponse = await CustomerSchema.findById(id);
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
 const readCustomerByName = (name: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const mongoResult = await CustomerSchema.findOne({name: name});
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

const createCustomer = (body: Customer) => {
    return new Promise(async(resolve, reject) => {
        try{
            const customer = new CustomerSchema(body);
            await customer.save();
            resolve('se ha agregado cliente')

        }catch (error) {
            reject(error);
        }
    });
};

const updateCustomer = (id: string, body: Customer) => {
    return new Promise ( async(resolve, reject) => {
        try {
            const updateEntity = await CustomerSchema.findByIdAndUpdate(id, body, { new: true});
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

const deleteCustomerById = (id: string) => {
    return new Promise(async (resolve, reject) => {
        try{
            const deleteEntry = await CustomerSchema.findByIdAndRemove(id);
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
    readCustomers,
    readCustomersById,
    readCustomerByName,
    createCustomer,
    updateCustomer,
    deleteCustomerById
  }; 