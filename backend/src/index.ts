const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

import { Request, Response } from "express";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT: number = 5000;

app.get('/', (req: Request, res: Response) => {
    res.send("Hello World!!! First Server!");
})

app.listen(PORT, () => {
    console.log(`Server is runnning on port: ${PORT}`);
})
