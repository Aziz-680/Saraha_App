import './config/env.config.js'
import express from "express";
import envConfig from './config/env.config.js';
import dbConnection from './DB/db.connection.js';
import {globalErrorHandler} from './Middlewares/index.js';
import * as controllers from './Modules/index.js';


const app = express();

const port = envConfig.app.PORT

dbConnection();
// put routers here 

app.use('/api/auth', controllers.authController);
app.use('/api/msg', controllers.msgController);
app.use('/api/user', controllers.userController);


app.use(globalErrorHandler);

app.listen(port, () => {
    console.log(`Server is ON at port ${port}`);
});