import express from 'express';
import dotenv from 'dotenv';
import {DBUtil} from "./db/DBUtil";
import cors from 'cors';
import userRouter from "./router/userRouter";
import categoryRouter from "./router/categoryRouter";
import productRouter from "./router/productRouter";
import addressRouter from "./router/addressRouter";
import cartRouter from "./router/cartRouter";
import orderRouter from "./router/orderRouter";

const app: express.Application = express(); // initialize the express js

// configure cors policy
app.use(cors());

// configure dot-env
dotenv.config({
    path: "./.env"
})
// configure express to read form data
app.use(express.json());

const port: number | undefined = Number(process.env.PORT) || 9000;
const dbUrl: string | undefined = process.env.EXPRESS_APP_MONGO_DB_CLOUD_URL;
const dbName: string | undefined = process.env.EXPRESS_APP_MONGO_DB_DATABASE_NAME;

app.get('/', (request: express.Request, response: express.Response) => {
    response.status(200);
    response.json({
        msg: 'Welcome to Express Server'
    });
})

// Router configuration
app.use('/api/users', userRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);
app.use('/api/addresses', addressRouter);
app.use('/api/carts', cartRouter);
app.use('/api/orders', orderRouter);

if (port && dbUrl && dbName) {
    app.listen(port, () => {
        if (dbUrl && dbName) {
            DBUtil.connectToDB(dbUrl, dbName).then((dbResponse) => {
                console.log(dbResponse);
            }).catch((error) => {
                console.error(error);
                process.exit(0); // stops the node js process
            });
        }
        console.log(`Server started at ${port}`);
    })
}