import express from 'express';
import customersControllers from './customers.controller';
import workersControllers from './workes.controller';
import productsControllers from './products.controller';






function routerApi(app: express.Application){
    app.use('/customers', customersControllers);
    app.use('/workers', workersControllers);
    app.use('/products', productsControllers);
};


export { routerApi };