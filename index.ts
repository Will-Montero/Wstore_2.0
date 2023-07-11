import express from 'express';
import mongoose from 'mongoose';

import { routerApi } from './src/controllers/routes';

const app = express();
const PORT = 3001;

app.use(express.json());

mongoose.connect('mongodb+srv://admi:123abc@cluster0.hwzu9vs.mongodb.net/')
.then(()=> {
    console.log("conexión a mongo establecida");
})
.catch(() => {
    console.log("error de conexión con mongo")
});

routerApi(app);
app.listen(PORT, function () {
    console.log("la aplicación de esta ejecutando en: http://localhost:" + PORT);
});

