import mongoose from "mongoose";
import { Worker } from "../types/workers.types";

const workerSchema = new mongoose.Schema<Worker>({
    name: {type: String, required: true},
    role: {type: String, required: true},
    cc: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    age: {type: String, required: true},
    cell: {type: String, required: true},
    civilStatus: {type: String, required: true},
    eps: {type: String, required: true},
    bloodType: {type: String, required: true}
})

const WorkerSchema = mongoose.model("Worker", workerSchema);
export { WorkerSchema};

